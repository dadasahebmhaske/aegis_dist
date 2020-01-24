
export class User{
    constructor(
        public email:string,
        public id:string,
        // private _token:string,
        // private _tokenExpirationDate:Date
    ){ }
    //getter method look like property when u accessing and user cant overwrite
    // get token(){
    //     if(!this._tokenExpirationDate || new Date()> this._tokenExpirationDate){
    //         return null;
    //     }
    //     return this._token
    // }
}