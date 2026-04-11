/**
 * Default material configuration for all models using MeshTransmissionMaterial.
 */
export const DEFAULT_MATERIAL_CONFIG = {
  transmission: 1,
  roughness: 0.059,
  thickness: 1.5,
  ior: 1.3,
  chromaticAberration: 0,
  anisotropicBlur: 0.3,
  distortion: 0,
  distortionScale: 0,
  // backside: true,
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
    // Arrow has a specific rotation on the mesh inside the center component
    meshRotation: [1 * (Math.PI / 180), -1.8 * (Math.PI / 180), 0],
  },
  Face1: {
    groupRotation: [97 * (Math.PI / 180), -2 * (Math.PI / 180), -22 * (Math.PI / 180)],
  },
  Face4: {
    groupRotation: [100 * (Math.PI / 180), 180 * (Math.PI / 180), 0],
  },
};
