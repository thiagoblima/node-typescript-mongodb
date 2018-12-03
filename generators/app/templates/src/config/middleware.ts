import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { IServer } from '../interfaces/ServerInterface';
import { renderFile } from 'ejs';
import * as path from 'path';

/**
 * @export
 * @class Middleware
 */
export default class Middleware {
    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    static init(server: IServer): void {
        // express middleware
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        server.app.use(cookieParser());
        // returns the compression middleware
        server.app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        server.app.use(helmet());
        // providing a Connect/Express middleware that can be used to enable CORS with various options
        server.app.use(cors());
        // To serve static files such as images, CSS files, and JavaScript files
        server.app.use(express.static(path.join(__dirname, '../client')));
        // render
        server.app.set('views', path.join(__dirname, '../client'));
        server.app.engine('html', renderFile);
        server.app.set('view engine', 'html');

        // cors
        server.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials'
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
}
