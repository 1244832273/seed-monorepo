/*
 * @Author: 鲁田文
 * @Date: 2021-09-23 09:26:10
 * @LastEditTime: 2021-09-24 09:35:35
 * @LastEditors: 鲁田文
 * @Description:
 */
import React from 'react';
import { Viewer, Entity } from 'resium';
import { Cartesian3 } from 'cesium';

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };

const CesiumGlobal = () => {
  return (
    <Viewer full>
      <Entity position={position} point={pointGraphics} />
    </Viewer>
  );
};

export default CesiumGlobal;
