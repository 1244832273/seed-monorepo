/*
 * @Author: 鲁田文
 * @Date: 2022-04-26 10:58:54
 * @LastEditTime: 2022-04-26 15:30:02
 * @LastEditors: 鲁田文
 * @Description:
 */
import React, { useEffect } from 'react';

export default function Index() {
  let a = 1;
  useEffect(() => {
    if (a) {
      console.log('1', 1);
    }
  }, [a]);
  return <div>index</div>;
}
