const path = require('path');
//Traemos la dependencia HtmlwebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CopyPlugin = require ('copy-webpack-plugin');
const Dotenv = require ('dotenv-webpack');

module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: './src/index.js',
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, 'dist'),
        // filename le pone el nombre al archivo final
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: false,
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
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
                test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
                use: {
                    loader: 'url-loader', // NOMBRE DEL LOADER
                    options: {
                        limit: false, // O LE PASAMOS UN NUMERO
                        // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',// Tipo de dato
                        // Especifica el tipo MIME con el que se alineará el archivo. 
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[contenthash].[ext]",
                        // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                        // ubuntu-regularhola.woff
                        outputPath: './assets/fonts/', 
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: '../assets/fonts/',
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false
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
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", 'assets/images'),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    devServer: {
        open: true
    }
}