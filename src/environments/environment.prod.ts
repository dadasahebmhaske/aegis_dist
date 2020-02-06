export const environment = {
  production: true,

  firebase: {
  },

  debug: false,
  log: {
    auth: false,
    store: false,
  },

  smartadmin: {
    api: null,
    db: 'smartadmin-angular'
  },
  // BaseUrl:'http://apk.sipl.pw/AegisAdminApi/api/',
  // BaseUrlDist:'http://apk.sipl.pw/AegisDistributorApi/api/',
  // ImageUrl:'http://apk.sipl.pw/AegisDistributorApi/Documents/',
  BaseUrl: 'http://192.168.1.198/AEGISAdmin/api/',
  BaseUrlDist: 'http://192.168.1.216:8081/distributorapi/api/',
  ImageUrl: 'http://192.168.1.198/AEGISAdmin/Documents/',
  authKey: 'Aegis:Aegis@12345?',
  secureKey: 'AEGIS11223344556'
};
