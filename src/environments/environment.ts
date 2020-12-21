// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {},


  debug: true,
  log: {
    auth: false,
    store: false,
  },

  smartadmin: {
    api: null,
    db: 'smartadmin-angular'
  },
  // BaseUrl: 'http://192.168.1.198/AEGISAdmin/api/',
  // BaseUrlDist: 'http://192.168.1.175:8081/distributorapi/api/',
  // ImageUrl: 'http://192.168.1.198/AEGISAdmin/Documents/',
  // authKey: 'Aegis:Aegis@12345?',
  // secureKey: 'AEGIS11223344556',
  // deptId: 1012

  BaseUrl: 'http://apk.sipl.pw/AegisAdminApi/api/',
  BaseUrlDist: 'http://apk.sipl.pw/AegisDistributorApi/api/',
  ImageUrl: 'http://apk.sipl.pw/AEGISAdminApi/Documents/',
  ImageUrlDist: 'http://apk.sipl.pw/AegisDistributorApi/Expenses/',
  authKey: 'Aegis:Aegis@12345?',
  secureKey: 'AEGIS11223344556',
  deptId: 1006

  // BaseUrl: 'http://14.192.18.37:808/AegisAdminApiUAT/api/',
  // BaseUrlDist: 'http://14.192.18.37:808/AegisDistributorApiUAT/api/',
  // ImageUrl: 'http://14.192.18.37:808/AegisAdminApiUAT/Documents/',
  // ImageUrlDist: 'http://14.192.18.37:808/AegisDistributorApiUAT/Expenses/',
  // authKey: 'Aegis:Aegis@12345?',
  // secureKey: 'AEGIS11223344556',
  // deptId: 1006

  // BaseUrl: 'http://14.192.18.37:808/AegisAdminApi/api/',
  // BaseUrlDist: 'http://14.192.18.37:808/AegisDistributorApi/api/',
  // ImageUrl: 'http://14.192.18.37:808/AegisAdminApi/Documents/',
  // ImageUrlDist: 'http://14.192.18.37:808/AegisDistributorApi/Expenses/',
  // authKey: 'Aegis:Aegis@12345?',
  // secureKey: 'AEGIS11223344556',
  // deptId: 1006

};
