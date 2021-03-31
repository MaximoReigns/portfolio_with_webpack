const path = require('path');
//Traemos la dependencia HtmlwebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CopyPlugin = require ('copy-webpack-plugin');

module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: './src/index.js',
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, 'dist'),
        // filename le pone el nombre al archivo final
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js']
    },
    module: {
        rules: [
            {   //Obtener todos los archivos .mjs o .js del proyecto
                test: /\.m?.js$/,
                //Ignora los modulos de la carpeta node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel_loader'
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[ext]",
                        outputPath: "./assets/fonts/",
                        ublicPath: "./assets/fonts/",
                        esModule: false,
                    }
                }
            },
        ]
    },
    plugins: [
        /*hacemos una instancia de lo que definimos en el inicio del archivo
          le anadimos por parametro un objeto donde vamos a tener las 
          configuraciones que le vamos anadir a nuestro plugin*/
        new HtmlWebpackPlugin({ 
            inject: true, //Inyecta el bundle al template html
            template: './public/index.html', //Esta es la ruta al template html
            filename: './index.html' //Nombre final del archivo.
        }),
        //Instanciamos el plugin
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", 'assets/images'),
                    to: "assets/images"
                }
            ]
        })
    ]
}