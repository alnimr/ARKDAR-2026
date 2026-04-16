/**
 * @file arenaEngine.ts
 * @description Biomechanical analysis engine for ARKDAR Arena Lab.
 * Specialized for Tent Pegging and Horseback Archery.
 */

export const THRESHOLDS = {
    TORSO: {
        DEFAULT: { min: -10, max: 15 },
        JUMPING: { min: 0, max: 30 },
        ARCHERY_GENERAL: { min: -5, max: 20 },
        TENT_STRIKE: { min: 65, max: 110 }
    },
    COG: {
        DEFAULT: { excellent: 5, good: 10 },
        ARCHERY_RELEASE: { excellent: 3, good: 8 }
    }
};

export const WELFARE_THRESHOLDS = {
    MAX_HALF_SEAT_RATIO: 0.7,
    OSCILLATION_CRITICAL: 0.005,
    OSCILLATION_WARNING: 0.002
};

export const HORSE_CONFIDENCE_THRESHOLD = 0.2;
export const HORSE_HISTORY_WINDOW = 10;
export const MAX_MISSING_FRAMES = 5;

export const PHASE_NAMES: Record<string, { ar: string, en: string }> = {
    'general': { ar: 'ركوب عام', en: 'General Riding' },
    'archery_approach': { ar: 'مرحلة 1: الاقتراب', en: 'Phase 1: Approach' },
    'archery_nocking': { ar: 'مرحلة 2: تجهيز السهم', en: 'Phase 2: Nocking' },
    'archery_draw': { ar: 'مرحلة 3: السحب والتصويب', en: 'Phase 3: Draw & Aim' },
    'archery_release': { ar: 'مرحلة 4: الإطلاق', en: 'Phase 4: Release' },
    'archery_recovery': { ar: 'مرحلة 5: التعافي', en: 'Phase 5: Recovery' },
    'tent_approach': { ar: 'مرحلة 1: الاقتراب', en: 'Phase 1: Approach' },
    'tent_engagement': { ar: 'مرحلة 2: الاشتباك', en: 'Phase 2: Engagement' },
    'tent_strike': { ar: 'مرحلة 3: الطعن', en: 'Phase 3: Strike' },
    'tent_recovery': { ar: 'مرحلة 4: التعافي', en: 'Phase 4: Recovery' },
    'tent_deceleration': { ar: 'مرحلة 5: إبطاء السرعة', en: 'Phase 5: Deceleration' }
};

export const ARCHERY_DIRECTION_NAMES: Record<string, { ar: string, en: string }> = {
    'side': { ar: 'هدف جانبي', en: 'Side Target' },
    'forward': { ar: 'هدف أمامي', en: 'Forward Target' },
    'backward': { ar: 'هدف خلفي (بارثي)', en: 'Backward Target (Parthian)' },
    'qabaq': { ar: 'هدف علوي (قبق)', en: 'Upward Target (Qabaq)' },
    'qabajak': { ar: 'هدف سفلي (قبجك)', en: 'Downward Target (Qabajak)' }
};

import { NormalizedLandmark } from '@mediapipe/tasks-vision';

export function detectCameraAngle(landmarks: NormalizedLandmark[]): 'side' | 'front_back' {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return 'side';

    const shoulderDx = Math.abs(leftShoulder.x - rightShoulder.x);
    const shoulderDz = Math.abs(leftShoulder.z - rightShoulder.z);
    
    const hipDx = Math.abs(leftHip.x - rightHip.x);
    const hipDz = Math.abs(leftHip.z - rightHip.z);
    
    const shoulderRatio = shoulderDz / (shoulderDx + 0.0001);
    const hipRatio = hipDz / (hipDx + 0.0001);

    if (shoulderRatio > 0.8 || hipRatio > 0.8) return 'side';
    return 'front_back';
}

export function computeTorsoAngle(landmarks: NormalizedLandmark[], width: number, height: number, cameraAngle: 'side' | 'front_back' = 'side') {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return null;

    const shoulderCenterX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
    const shoulderCenterY = ((leftShoulder.y + rightShoulder.y) / 2) * height;

    const hipCenterX = ((leftHip.x + rightHip.x) / 2) * width;
    const hipCenterY = ((leftHip.y + rightHip.y) / 2) * height;

    const dx = shoulderCenterX - hipCenterX;
    const dy = hipCenterY - shoulderCenterY;
    const angle = Math.atan2(dx, dy) * 180 / Math.PI;

    if (cameraAngle === 'front_back') return Math.abs(angle);
    return angle;
}

export function calculateAngle(a: NormalizedLandmark | null, b: NormalizedLandmark | null, c: NormalizedLandmark | null) {
    if (!a || !b || !c) return null;
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) angle = 360.0 - angle;
    return angle;
}

export function calculateDistance(a: NormalizedLandmark | null, b: NormalizedLandmark | null) {
    if (!a || !b) return null;
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function computeShoulderTwist(landmarks: NormalizedLandmark[]) {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    if (!leftShoulder || !rightShoulder) return null;
    const dz = Math.abs(leftShoulder.z - rightShoulder.z);
    const dx = Math.abs(leftShoulder.x - rightShoulder.x);
    const angle = Math.atan2(dz, dx) * 180 / Math.PI;
    return 90 - angle;
}

export function computeCOGBalance(landmarks: NormalizedLandmark[], width: number, height: number) {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];

    if (!leftShoulder || !rightShoulder || !leftKnee || !rightKnee) return null;

    const shoulderCenterX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
    const shoulderCenterY = ((leftShoulder.y + rightShoulder.y) / 2) * height;

    const kneeCenterX = ((leftKnee.x + rightKnee.x) / 2) * width;
    const kneeCenterY = ((leftKnee.y + rightKnee.y) / 2) * height;

    const verticalAngle = Math.atan2(shoulderCenterX - kneeCenterX, kneeCenterY - shoulderCenterY) * 180 / Math.PI;
    const horizontalOffset = (shoulderCenterX - kneeCenterX) / width;

    return { verticalAngle, horizontalOffset };
}

export function isHalfSeatPosture(metrics: { torsoAngle?: number | null; cogBalance?: { verticalAngle: number } | null }) {
    const { torsoAngle, cogBalance } = metrics;
    if (typeof torsoAngle !== 'number' || !cogBalance || typeof cogBalance.verticalAngle !== 'number') return false;
    const isLeaningForward = torsoAngle > 15; 
    const isBalancedOverKnees = Math.abs(cogBalance.verticalAngle) < 15;
    return isLeaningForward && isBalancedOverKnees;
}

export function evaluateFrameMetrics(
    metrics: { torsoAngle?: number | null; cogBalance?: { verticalAngle: number } | null; pelvisVariance?: number }, 
    context: { discipline: string; phase: string; locale?: string }, 
    halfSeatData: { ratio: number } | null = null
) {
    const { torsoAngle, cogBalance, pelvisVariance } = metrics;
    const { discipline, phase, locale = 'ar' } = context;

    const evalResults = {
        torso: { level: 'N/A', color: 'var(--text-secondary)' },
        cog: { level: 'N/A', color: 'var(--text-secondary)' },
        feedback: locale === 'ar' ? "جاري تحليل القوام والحركة..." : "Analyzing posture and movement..."
    };

    const isAr = locale === 'ar';

    let torsoT = THRESHOLDS.TORSO.DEFAULT;
    if (discipline === 'jumping') torsoT = THRESHOLDS.TORSO.JUMPING;
    if (discipline === 'horseback_archery' && phase === 'general') torsoT = THRESHOLDS.TORSO.ARCHERY_GENERAL;
    if (phase === 'tent_strike') torsoT = THRESHOLDS.TORSO.TENT_STRIKE;

    if (typeof torsoAngle === 'number') {
        if (torsoAngle >= torsoT.min && torsoAngle <= torsoT.max) {
            evalResults.torso = { level: isAr ? 'ممتاز' : 'Excellent', color: 'var(--color-brand-primary)' };
            evalResults.feedback = isAr ? "وضعية رائعة! زاوية الجذع مثالية لهذه المرحلة." : "Great posture! Your trunk angle is well-balanced for this phase.";
        } else if (torsoAngle >= torsoT.min - 10 && torsoAngle <= torsoT.max + 15) {
            evalResults.torso = { level: isAr ? 'جيد' : 'Good', color: 'var(--color-brand-secondary)' };
            evalResults.feedback = isAr ? "وضعية جيدة، حاول ضبط زاوية الجذع لزيادة الثبات." : "Good posture, but try to refine your trunk angle for better stability.";
        } else {
            evalResults.torso = { level: isAr ? 'بحاجة لتحسين' : 'Needs improvement', color: 'var(--color-brand-tertiary)' };
            evalResults.feedback = isAr ? "الجذع مائل جداً. حاول موازنة مركز الثقل بشكل أفضل." : "Your trunk is leaning too far. Try to adjust your center of gravity.";
        }
        
        if (halfSeatData && halfSeatData.ratio > WELFARE_THRESHOLDS.MAX_HALF_SEAT_RATIO) {
            if (evalResults.torso.level.includes('تحسين') || evalResults.torso.level.includes('improvement')) {
                evalResults.torso = { level: isAr ? 'مقبول (نصف مقعد)' : 'Acceptable (Half-seat)', color: '#f59e0b' };
                evalResults.feedback = isAr ? "ميل للأمام مع الحفاظ على وضعية نصف المقعد لحماية ظهر الحصان." : "Leaning forward, but maintaining a good half-seat to protect the horse's back.";
            }
        }
    }

    let cogT = THRESHOLDS.COG.DEFAULT;
    if (phase === 'archery_release') cogT = THRESHOLDS.COG.ARCHERY_RELEASE;

    if (cogBalance && typeof cogBalance.verticalAngle === 'number') {
        const absAngle = Math.abs(cogBalance.verticalAngle);
        if (absAngle <= cogT.excellent) evalResults.cog = { level: isAr ? 'ممتاز' : 'Excellent', color: 'var(--color-brand-primary)' };
        else if (absAngle <= cogT.good) {
            evalResults.cog = { level: isAr ? 'جيد' : 'Good', color: 'var(--color-brand-secondary)' };
        }
        else {
            evalResults.cog = { level: isAr ? 'بحاجة لتحسين' : 'Needs improvement', color: 'var(--color-brand-tertiary)' };
            evalResults.feedback = isAr ? "مركز الثقل غير مستقر. ركز على محاذاة الأكتاف فوق الركبتين." : "Your center of gravity is shifting. Focus on aligning your shoulders over your knees.";
        }
    }

    // Welfare / Saddle Slapping Check
    if (pelvisVariance !== undefined) {
        if (pelvisVariance > WELFARE_THRESHOLDS.OSCILLATION_CRITICAL) {
            evalResults.feedback += isAr ? "\n⚠️ تنبيه الرفاهية: اهتزاز عالٍ للورك (Impact) قد يزعج الحصان." : "\n⚠️ Welfare Alert: Saddle Slapping (High Impact) detected.";
        } else if (pelvisVariance <= WELFARE_THRESHOLDS.OSCILLATION_WARNING) {
            evalResults.feedback += isAr ? "\n✅ مقعد مستقر: امتصاص ممتاز لحركة الحصان." : "\n✅ Stable Seat: Good absorption of horse's movement.";
        }
    }

    return evalResults;
}

export function analyzeHorseKinematics(history: { detected: boolean; boundingBox: { originY: number, height: number } }[], fps: number = 30, locale: string = 'ar') {
    if (history.length < 30) return null;

    const validFrames = history.filter(h => h.detected && h.boundingBox);
    if (validFrames.length < 30) return null;

    const centers = validFrames.map(h => h.boundingBox.originY + (h.boundingBox.height / 2));
    
    // Detrending
    const windowSize = 15;
    const detrended = [];
    for (let i = 0; i < centers.length; i++) {
        const start = Math.max(0, i - Math.floor(windowSize / 2));
        const end = Math.min(centers.length, i + Math.floor(windowSize / 2));
        let sum = 0;
        for (let j = start; j < end; j++) sum += centers[j];
        detrended.push(centers[i] - (sum / (end - start)));
    }

    // Frequency Calc
    let crossings = 0;
    for (let i = 1; i < detrended.length; i++) {
        if (detrended[i-1] * detrended[i] < 0) crossings++;
    }

    const frequencyHz = (crossings / 2) / (validFrames.length / fps);
    const stridesPerMinute = frequencyHz * 60;
    const isAr = locale === 'ar';

    let gait = isAr ? 'جاري التحليل...' : 'Analyzing...';
    if (frequencyHz > 0.4 && frequencyHz <= 1.2) gait = isAr ? 'مسار (Walk)' : 'Walk';
    else if (frequencyHz > 1.2 && frequencyHz <= 1.9) gait = isAr ? 'خبب (Trot)' : 'Trot';
    else if (frequencyHz > 1.9 && frequencyHz <= 2.4) gait = isAr ? 'هذيب (Canter)' : 'Canter';
    else if (frequencyHz > 2.4) gait = isAr ? 'عدو (Gallop)' : 'Gallop';
    else if (frequencyHz <= 0.4) gait = isAr ? 'وقوف' : 'Halt';

    return { frequencyHz, stridesPerMinute, gait };
}
