const AppConstants = require('./constants');

export default class HttpService {
    static async GetMenuItems(key, vegOnly){
        const header = new Headers();
        header.append('X-ZUMO-AUTH', key);
        header.append('ZUMO-API-VERSION', '2.0.0');

        return await fetch(AppConstants.MenuItems, {headers: header, method: 'GET'}).then(async (resp) => {
            return await resp.json().then((data) => {
                return data;
            });
        });
    }

    // static SaveItem(key){
    //     const data = [
    //         {ItemName: 'Bread Omelette', Price: 0.99, Description: 'Get 2 slices of bread and one egg', IsVegetarian: false, Image: 'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?ixlib=rb-0.3.5&s=7ec7b3d5920bc7476bf497f34e91413b&auto=format&fit=crop&w=711&q=80'},
    //         {ItemName: 'Veg Pizza', Price: 2.99, Description: 'Contains corn, tomato, cheese, onion, mushroom.', IsVegetarian: true, Image: 'https://images.unsplash.com/photo-1453831210728-695502f9f795?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d830338c479f450ec31ebef0494e9c09&auto=format&fit=crop&w=1134&q=80'},
    //         {ItemName: 'Non-Veg Pizza', Price: 3.49, Description: 'Chicken, capsicum, onion, cheese, paprika.', IsVegetarian: false, Image: 'https://images.unsplash.com/photo-1511516412963-801b050c92aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f23e22ac67f9dd47c1471491abfdda84&auto=format&fit=crop&w=1050&q=80'},
    //         {ItemName: 'Veg Pasta', Price: 1.00, Description: 'Veg pasta, tomato flavour.', IsVegetarian: true, Image: 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b476c11d5b658cd28bdd4920279ecf7a&auto=format&fit=crop&w=634&q=80'},
    //         {ItemName: 'Non-Veg Pasta', Price: 1.49, Description: 'Chicken pasta made in rich tomato sauce.', IsVegetarian: false, Image: 'https://images.unsplash.com/photo-1479832912902-77089f02b1d2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab59164190182dc7bd725c1b1af1c600&auto=format&fit=crop&w=1050&q=80'},
    //         {ItemName: 'Veg Burger', Price: 0.99, Description: 'Made with Potato, cabbage, onion, capsicum, cheese and mayonnaise.', IsVegetarian: true, Image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=db4ad901fa9d778a5878044dc58a29cf&auto=format&fit=crop&w=1050&q=80'},
    //         {ItemName: 'Veg Burger', Price: 0.99, Description: 'Made with Chicken, cabbage, onion, capsicum, cheese and mayonnaise.', IsVegetarian: false, Image: 'https://images.unsplash.com/photo-1512224519710-fdd86054f573?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff09483b711cd12fe0d4e014acd5d6ca&auto=format&fit=crop&w=634&q=80'},
    //     ];

    //     data.forEach((item, index) => {
    //         const header = new Headers();
    //         header.append('X-ZUMO-AUTH', key);
    //         header.append('ZUMO-API-VERSION', '2.0.0');
    //         header.append('Content-Type', 'application/json');
    //         const body = JSON.stringify(item);

    //         fetch(AppConstants.MenuItems, {
    //             headers: header, method: 'POST', body: item
    //         }).then((resp) => {
    //             resp.json().then((data) => {
    //                 console.log(data);
    //             })
    //         })
    //     });
    // }
}