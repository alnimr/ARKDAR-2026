import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
    PoseLandmarker,
    ObjectDetector,
    FilesetResolver,
} from '@mediapipe/tasks-vision';

interface PoseAnalysisConfig {
    runningMode: 'VIDEO' | 'IMAGE';
    numPoses?: number;
    scoreThreshold?: number;
    modelPaths?: {
        pose?: string;
        detector?: string;
        wasm?: string;
    };
}

const DEFAULT_PATHS = {
    pose: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task",
    detector: "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite2/float16/1/efficientdet_lite2.tflite",
    wasm: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
};

export function usePoseAnalysis(config: PoseAnalysisConfig) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const poseLandmarker = useRef<PoseLandmarker | null>(null);
    const objectDetector = useRef<ObjectDetector | null>(null);

    const paths = useMemo(() => ({ 
        ...DEFAULT_PATHS, 
        ...config.modelPaths 
    }), [config.modelPaths]);

    useEffect(() => {
        async function init() {
            try {
                const vision = await FilesetResolver.forVisionTasks(paths.wasm);

                poseLandmarker.current = await PoseLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: paths.pose,
                        delegate: "GPU"
                    },
                    runningMode: config.runningMode,
                    numPoses: config.numPoses || 1
                });

                objectDetector.current = await ObjectDetector.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: paths.detector,
                        delegate: "GPU"
                    },
                    scoreThreshold: config.scoreThreshold || 0.2,
                    runningMode: config.runningMode
                });

                setIsLoaded(true);
            } catch (err) {
                console.error("PoseAnalysis Init Error:", err);
                setError(err instanceof Error ? err.message : "Failed to initialize MediaPipe models");
            }
        }

        init();

        return () => {
            poseLandmarker.current?.close();
            objectDetector.current?.close();
        };
    }, [paths.wasm, paths.pose, paths.detector, config.runningMode, config.numPoses, config.scoreThreshold]);

    const detectFrame = useCallback((videoElement: HTMLVideoElement, timestamp: number) => {
        if (!poseLandmarker.current || !objectDetector.current) return null;

        const poseResults = poseLandmarker.current.detectForVideo(videoElement, timestamp);
        const objectResults = objectDetector.current.detectForVideo(videoElement, timestamp);

        return {
            pose: poseResults,
            objects: objectResults
        };
    }, []);

    return {
        isLoaded,
        error,
        detectFrame
    };
}
