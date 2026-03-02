import LightRays from './LightRays';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#b658d0"
    raysSpeed={0.5}
    lightSpread={0.5}
    rayLength={2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.07}
    distortion={0}
    className="custom-rays"
    pulsating
    fadeDistance={1}
    saturation={1}
/>
</div>