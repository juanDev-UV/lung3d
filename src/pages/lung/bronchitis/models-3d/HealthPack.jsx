/* eslint-disable react/no-unknown-property */
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

const HealthPack = (props) => {
  const healthPackRef = useRef();

  const { nodes, materials, animations } = useGLTF("/models-3d/health-pack.glb");

  const { actions } = useAnimations(animations, healthPackRef);

  
  useEffect(() => {
    console.log(actions);

  }, [actions]);

  return (
    <group ref={healthPackRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="HealthPack" position={[0.101, -1.928, 0.047]}>
          <group name="MedicalKit">
            <mesh
              name="MedicalKit_1"
              castShadow
              receiveShadow
              geometry={nodes.MedicalKit_1.geometry}
              material={materials.MedicalKitMaterial}
            />
          </group>
          <group name="PillBottle">
            <group name="CylinderPillBottle">
              <mesh
                name="CylinderPillBottle_1"
                castShadow
                receiveShadow
                geometry={nodes.CylinderPillBottle_1.geometry}
                material={materials.CylinderPillBottleMaterial}
              />
            </group>
            <group
              name="PillBottleCap"
              position={[0.057, 1.504, -0.423]}
              rotation={[2.445, 0, -Math.PI]}>
              <mesh
                name="PillBottleCap_1"
                castShadow
                receiveShadow
                geometry={nodes.PillBottleCap_1.geometry}
                material={materials.PillBottleCapMaterial}
                position={[3.347, 0.646, 2.334]}
                rotation={[-0.679, -0.081, 0.158]}
              />
            </group>
            <group name="PillBottleLabel">
              <mesh
                name="PillBottleLabel_1"
                castShadow
                receiveShadow
                geometry={nodes.PillBottleLabel_1.geometry}
                material={materials.PillBottleCapMaterial}
              />
            </group>
          </group>
          <group name="Syringe" rotation={[0.019, -0.048, 0.014]}>
            <group name="SyringeBarrel" position={[0, 1.087, 0]}>
              <mesh
                name="SyringeBarrel_1"
                castShadow
                receiveShadow
                geometry={nodes.SyringeBarrel_1.geometry}
                material={materials.SyringeBarrelMaterial}
                position={[-0.91, 0.23, 0.286]}
              />
              <group name="SyringeNeedle">
                <mesh
                  name="SyringeNeedle_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.SyringeNeedle_1.geometry}
                  material={materials.MedicalKitMaterial}
                  position={[-0.91, 0.23, 0.286]}
                />
              </group>
            </group>
            <group name="SyringePlunger">
              <mesh
                name="SyringePlunger_1"
                castShadow
                receiveShadow
                geometry={nodes.SyringePlunger_1.geometry}
                material={materials.SyringeNeedleMaterial}
                position={[-0.91, 0.23, 0.286]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default HealthPack;

useGLTF.preload("/models-3d/health-pack.glb")