# Blue Modas - WebApp

Front-end of virtual store for Blue Modas Built with Angular 10

## About this Project

Front-end of virtual store for Blue Modas Built with Angular 10

**Home Page**
![app](https://github.com/brunoalves9698/bluemodaswebapp/screen-shot/blob/master/01-home.JPG)

**Cart Page**
![app](https://github.com/brunoalves9698/bluemodaswebapp/screen-shot/blob/master/02-carrinho.JPG)

**Client Page**
![app](https://github.com/brunoalves9698/bluemodaswebapp/screen-shot/blob/master/03-cliente.JPG)

**History Page**
![app](https://github.com/brunoalves9698/bluemodaswebapp/screen-shot/blob/master/04-historico.JPG)

## Why?

Project created with the intention of consuming a REST API in order to serve as a client-side for a virtual store.

## Features

- Product listing screen

- Cart/Shopping Basket Screen

- Customer registration/update screen

- Purchase history screen

## Architecture and Organization

- Commands Folder
  - Server Response Model
  - Models for registering a purchase

- Components Folder
  - Layout Components (navbar and footer)
  - Shared and Common Components
    - Featured Messages
    - Loading Component
    - Form Validation Messages
  
- Models Folder (with a abstract model base)
   
- Pages Folder
 
- Services Folder (with a abstract service base)

- Shared Folder
  - Constants
  - Storage (onsite storage classes storage with a abstract storage base)
  - Utils (cryptography, sort list and whatever needed)

- Assets Folder (fonts, images and whatever needed)

- Theme Folder (style´s variables)
   
## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Angular Application. You can get it from the following links:
- [Node](https://nodejs.org/en/download/)
- [Angular](https://angular.io/cli)

### Installing the Project

**Cloning the Repository**

```
$ git clone https://github.com/brunoalves9698/bluemodaswebapp.git

$ cd bluemodaswebapp
```

### Running the Project

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ ng server -o 
```

## Built With

- [Angular 10](https://angular.io/)
