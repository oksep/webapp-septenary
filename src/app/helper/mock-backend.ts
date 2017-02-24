import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod,
    XHRBackend,
    RequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

export class MockBackendFactory {
    static obtain(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        let HEROES = [
            {id: 11, name: 'Mr. Nice'},
            {id: 12, name: 'Narco'},
            {id: 13, name: 'Bombasto'},
            {id: 14, name: 'Celeritas'},
            {id: 15, name: 'Magneta'},
            {id: 16, name: 'RubberMan'},
            {id: 17, name: 'Dynama'},
            {id: 18, name: 'Dr IQ'},
            {id: 19, name: 'Magma'},
            {id: 20, name: 'Tornado'}
        ];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            console.log('BackendConnection URL: ', connection.request.url);

            // wrap in timeout to simulate server api call
            setTimeout(() => {

                if (connection.request.url.endsWith('/api/auth/login') && connection.request.method === RequestMethod.Post) {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 402,
                        body: {
                            success: false,
                            description: '登录名或密码错误',
                            data: {
                                token: 'JWT asdjfklnajkndsfnin9812nkjlansdkjfkl',
                            }
                        }
                    })));
                    return;
                }

                // authenticate
                if (connection.request.url.endsWith('/api/heroes') && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            data: JSON.stringify(HEROES),
                            token: 'fake-jwt-token'
                        }
                    })));
                    return;
                }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: users})));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                    }

                    return;
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => {
                            return user.id === id;
                        });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: user})));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                    }

                    return;
                }

                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());

                    // validation
                    let duplicateUser = users.filter(user => {
                        return user.username === newUser.username;
                    }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                    }

                    // save new user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({status: 200})));

                    return;
                }

                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({status: 200})));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
                    }

                    return;
                }

                // pass through any requests not handled above
                let realHttp = new Http(realBackend, options);
                let requestOptions = new RequestOptions({
                    method: connection.request.method,
                    headers: connection.request.headers,
                    body: connection.request.getBody(),
                    url: connection.request.url,
                    withCredentials: connection.request.withCredentials,
                    responseType: connection.request.responseType
                });
                realHttp.request(connection.request.url, requestOptions)
                    .subscribe((response: Response) => {
                            connection.mockRespond(response);
                        },
                        (error: any) => {
                            connection.mockError(error);
                        });

            }, 1500);

        });

        return new Http(backend, options);
    };
}
