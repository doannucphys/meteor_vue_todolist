Folders:
1 - .meteor:
    created when create project with meteor create projectname. This folder store infomation about meteor version of project (that
    could be different to meteor version installed in your computer or host)
    file packages: list all package add to project by default, when create project. If you add package with command meteor add packagename, it will be here. You can add package name in this file without runing command meteor add packageName
    ATTENTION! when you copy project form 1 folder to other - REMEMBER to copy folder .meteor, or your project could not run.
    You can update meteor version of project (see meteor docs on meteor web for mor infos)
2 - .cache: cache all information relate to project. When copy project, you don't need to care about that. Same thing for node_modules
3 - config: store parameters used in client and server
4- packages: 
    This will be neccesary when you copy (folk) packages from meteor host and modify it
    OR, you make your own packages.
5 - private: put files and folders that you don't want meteor compile
6 - public: store image, document, etc. 
    in real world, docs and images, videos etc. will put to AWS or any other cloud services to avoid push and get data through server

7- src:
    src have two part: component on client side and import component. 
    It's good practise to put all client component in src/client then minify css and js file will be done. I've tried to put vue compoent in each modules in src/imports folder and the minifying process of css and js got error (?)

    in src/imports: store all component use for client side, server side or both. 
8 - package.json: list all dependencies (package used in project). In this file declare infos of mongodb host.
