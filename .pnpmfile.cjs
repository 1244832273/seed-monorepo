/*
 * @Author: 鲁田文
 * @Date: 2022-05-25 14:00:35
 * @LastEditTime: 2022-05-25 14:00:35
 * @LastEditors: 鲁田文
 * @Description: 
 */
// function readPackage(pkg, context) {
//   console.log('pkg', pkg)
//   // Override the manifest of foo@1.x after downloading it from the registry
//   if (pkg.name === 'foo' && pkg.version.startsWith('1.')) {
//     // Replace bar@x.x.x with bar@2.0.0
//     pkg.dependencies = {
//       ...pkg.dependencies,
//       bar: '^2.0.0'
//     }
//     context.log('bar@1 => bar@2 in dependencies of foo')
//   }

//   // This will change any packages using baz@x.x.x to use baz@1.2.3
//   if (pkg.dependencies.baz) {
//     pkg.dependencies.baz = '1.2.3';
//   }

//   return pkg
// }

// module.exports = {
//   hooks: {
//     readPackage
//   }
// }
