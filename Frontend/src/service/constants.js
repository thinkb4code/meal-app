module.exports = {
    // App related constants
    AppName: "Meal Order",

    // App Local Storage Data related keys
    APIAuthKey: "apiAuthKey",
    AuthProvider: "authProvider",
    AuthLoginId: "authId",
    AzureADProvider: "aad",
    TwitterProvider: "twitter",

    // Service URLs
    TwitterLoginUrl: "https://saketamealapp.azurewebsites.net/.auth/login/twitter",
    AzureADLoginUrl: "https://saketamealapp.azurewebsites.net/.auth/login/aad",
    AuthUserDetails: "https://saketamealapp.azurewebsites.net/.auth/me",

    // Azure Easy Table EndPoint
    UserProfile: "https://saketamealapp.azurewebsites.net/tables/profile",
    MenuItems: "https://saketamealapp.azurewebsites.net/tables/menu",

    // App UI static data binding
    OfficeBuilding: ["Kavuri Hills - Block1", "Kavuri Hills - ABC Building"],
    OfficeFloors: ["Cellar", "Ground Floor", "First Floor", "Sales Division"],

}