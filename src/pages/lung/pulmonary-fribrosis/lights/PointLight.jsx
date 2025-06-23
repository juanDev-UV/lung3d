const LightPointModel = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        position={[2, 5, 2]}
        intensity={80}
        distance={20}
        decay={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.005}
      />
    </>
  );
};

export default LightPointModel;
