/**
 * Default material configuration for all models using MeshTransmissionMaterial.
 */
export const DEFAULT_MATERIAL_CONFIG = {
  transmission: 1,
  roughness: 0.05,
  thickness: 0.8,
  ior: 1.5,
  chromaticAberration: 0.03,
  anisotropicBlur: 0.1,
  distortion: 0.1,
  distortionScale: 0.1,
  backside: true,
  samples: 16,
  resolution: 1024,
  color: "#ffffff",
};

/**
 * Model-specific overrides and defaults.
 * Each entry can override any field from DEFAULT_MATERIAL_CONFIG
 * and also define model-specific properties like scale and internal rotation.
 */
export const MODELS_CONFIG = {
  Arrow: {
    scale: 3.9,
    roughness: 0.09,
    thickness: 1.9,
    ior: 1.4,
    anisotropicBlur: 50,
    distortion: 0,
    chromaticAberration: 0,
    samples: 1,
    resolution: 256,
    // Arrow has a specific rotation on the mesh inside the center component
    meshRotation: [0, -1.8 * (Math.PI / 180), 0],
  },
  BarChar: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
  },
  Brain: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
  },
  Bulb: {
    scale: 3.9,
    roughness: 0,
    thickness: 0.8,
    ior: 1.5,
    chromaticAberration: 0,
    anisotropicBlur: 50,
    distortion: 0,
  },
  Crown: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    chromaticAberration: 0,
  },
  Face1: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    groupRotation: [97 * (Math.PI / 180), -2 * (Math.PI / 180), -22 * (Math.PI / 180)],
  },
  Face2: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
  },
  Face3: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
  },
  Face4: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    groupRotation: [100 * (Math.PI / 180), 180 * (Math.PI / 180), 0],
  },
  Face5: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
  },
  Message: {
    scale: 3.9,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    chromaticAberration: 0,
    distortion: 0,
  },
  Quote: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    chromaticAberration: 0,
  },
  Setting: {
    scale: 3,
    roughness: 0.04,
    thickness: 0.05,
    ior: 1.1,
    chromaticAberration: 0,
    anisotropicBlur: 0.6,
  },
  Star: {
    scale: 3,
    roughness: 0.05,
    thickness: 0.8,
    ior: 1.5,
    distortionScale: 0, // Star didn't have distortionScale defined, but distortion was 0.1
  },
};
