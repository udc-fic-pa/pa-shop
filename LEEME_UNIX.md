# Instalación / Configuración entorno PA / 2018-2019 - Linux y macOS
-------------------------------------------------------------------------------

## Descargar y copiar el SW
> Disponible desde ftp://ftp.fic.udc.es/POJOyWS/

- Seleccionar la versión adecuada al operativo (Linux macOS) / 
  arquitectura del ordenador (32 o 64 bits).
  
- Descargar y descomprimir en `/opt` el siguiente software
    - jdk
    - maven
    - eclipse
    - visual studio code
     
## Descargar y descomprimir los ejemplos de la asignatura
- Descargar en `$HOME/software`

> Disponibles en moodle

```shell
    cd $HOME/software
    tar zxf pa-shop-1.0.0-src.tar.gz
```

## Establecer variables de entorno
- Añadir al fichero `$HOME/.bashrc` lo siguiente (en el caso de macOS utilizar 
  el fichero `$HOME/.bash_profile`)

```shell
    # JDK (Linux)
    export JAVA_HOME=/opt/jdk1.8.0_181

    # Para macOS usa:
    #export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home

    PATH=$JAVA_HOME/bin:$PATH

    # Maven
    MAVEN_HOME=/opt/apache-maven-3.5.4
    PATH=$MAVEN_HOME/bin:$PATH
    export MAVEN_OPTS="-Xms512m -Xmx1024m"

    # Eclipse.
    PATH=/opt/eclipse:$PATH
```

- Cerrar todos los terminales y abrir terminales nuevos

- Comprobar que el entorno ha quedado correctamente configurado comprobando 
  las salidas de los siguientes comandos

```shell
    which java
    which mvn
    which eclipse
```

- Comprobar que se puede ejecutar visual studio code

## Instalación de Node en Linux (método recomendado)
- Descomprimir la distribución binaria, node-v10.15.0-linux-x64.tar.xz, 
  y descomprimirla en /opt

- Añadir al fichero `$HOME/.bashrc` lo siguiente

```shell
    # NODE
    NODE_HOME=/opt/node-v10.15.0-linux-x64
    PATH=$NODE_HOME/bin:$PATH
```

- Cerrar todos los terminales y abrir terminales nuevos. Comprobar que 
  ha quedado correctamente instalado

```shell
    which node
    which npm
```

## Instalación de Node en Linux (método alternativo)
- Se recomienda instalarlo como paquete siguiendo las instrucciones que se 
  indican en https://nodejs.org/es/download/package-manager/ . Por ejemplo, 
  en ubuntu:

```shell
    sudo apt-get install nodejs
    sudo apt-get install npm
```

## Instalación de Node en MacOS
- Doble click en node-v10.15.0.pkg y elegir las opciones por defecto.

## Instalación de MySQL 8.0.12 en Linux (método recomendado)
- Se recomienda instalarlo como paquete siguiendo las instrucciones que se 
  indican en https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html

## Instalación de MySQL 8.0.12 en Linux (método alternativo)
- En caso de no poder instalarlo como paquete se pueden seguir las 
  instrucciones de este apartado para realizar una instalación de MySQL
  como usuario root y ejecución como usuario normal

- Descargar y descomprimir mysql en `/opt` 

```shell
    sudo chown -R root:root mysql-8.0.12-linux-glibc2.12-x86_64
```

```shell
    sudo chmod -R 755 mysql-8.0.12-linux-glibc2.12-x86_64
    sudo ln -s /opt/mysql-8.0.12-linux-glibc2.12-x86_64 /usr/local/mysql
```

- En Ubuntu debe instalarse la librería libaio1

```shell
    sudo apt-get install libaio1
```

- Añadir al fichero `$HOME/.bashrc` lo siguiente

```shell
    # MySQL 
    MYSQL_HOME=/opt/mysql-8.0.12-linux-glibc2.12-x86_64
    PATH=$MYSQL_HOME/bin:$PATH
```

- Cerrar todos los terminales y abrir terminales nuevos. Comprobar que 
  ha quedado correctamente instalado

```shell
    which mysqld
```

- Creación del directorio de datos

```shell
    mkdir $HOME/software/.MySQLData
```

- Crear un fichero $HOME/.my.cnf con el siguiente contenido (en lugar de \<login\>
  poner el login del usuario)

```shell
    [mysqld]
    datadir=/home/<login>/software/.MySQLData
```

- Creación de zona de datos del servidor MySQL (se creará el usuario root con 
  password vacía)

```shell
    cd /usr/local/mysql/bin
    mysqld --initialize-insecure
```    

## Instalación de MySQL en macOS

- Doble click en mysql-8.0.12-macos10.13-x86_64.dmg y elegir las opciones 
  por defecto.

- Preferencias del sistema -> MySQL -> Elegir "Start MySQL when your computer 
  starts up".

- Más información: https://dev.mysql.com/doc/refman/8.0/en/osx-installation.html

## Creación de bases de datos necesarias para los ejemplos y el proyecto plantilla

- Arrancar MySQL (sólo si el arranque no es automático)

```shell
    mysqld
```

> NOTA: Si se produce un error de conexión al ejecutar los siguientes comandos
  (`mysqladmin` o `myqsl`), probar a ejecutarlos añadiendo la opción `-p` para que
  solicite la password del usuario root.

- Creación de bases de datos ws y wstest (abrir en una consola diferente)

```shell
  mysqladmin -u root create pa
  mysqladmin -u root create patest
  mysqladmin -u root create paproject
  mysqladmin -u root create paprojecttest
```

- Creación de usuario ws con password con permisos sobre ws y wstest

```shell
    mysql -u root
        CREATE USER 'pa'@'localhost' IDENTIFIED BY 'pa';
        GRANT ALL PRIVILEGES ON pa.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON patest.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON paproject.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON paprojecttest.* to 'pa'@'localhost' WITH GRANT OPTION;
        exit
```

- Comprobar acceso a BD

```shell
    mysql -u pa --password=pa pa
        exit

    mysql -u pa --password=pa patest
        exit

    mysql -u pa --password=pa paproject
        exit

    mysql -u pa --password=pa paprojecttest
        exit
```
        
## Inicialización de datos de ejemplo y compilación de los ejemplos

- Inicialización de la base de datos y compilación/configuración de los ejemplos

```shell
    cd $HOME/software/pa-shop-1.0.0/backend
    mvn sql:execute install
    cd $HOME/software/pa-shop-1.0.0/frontend
    npm install
```
    
## Finalizar la ejecución de la BD

- Finalizar la ejecución de la BD (sólo si el arranque no es automático)

```shell
    mysqladmin -u root shutdown
```

## Configuración de eclipse
> NOTA: El wizard "Preferences" está accesible desde el menú "Window" (menú
  "Eclipse" en macOS)

- Utilizar Java 1.8:
    + En "Preferences>Java>Compiler" seleccionar "1.8" en "Compiler
    compliance level".
    + En "Preferences>Java>Installed JREs" seleccionar la JVM 1.8.0(Java SE 8).

- Establecer UTF-8 como el encoding por defecto de Eclipse
     + En "Preferences>General>Workspace" seleccionar UTF-8 en "Text File Encoding"
  
- Establecer UTF-8 como el encoding por defecto para ficheros properties Java
    + En "Preferences>General>Content Types>Text>Java Properties File", escribir "UTF-8" y pulsar "Update"

## Instalación y configuración básica de Git
---------------------------------------------------------------------

- Instalación en Linux (Ubuntu)

```shell
    sudo apt-get install git
```

- Instalación en macOS
    - Descargar el instalador de [ftp://ftp.fic.udc.es/POJOyWS/](ftp://ftp.fic.udc.es/POJOyWS/)
    - Doble-click en el instalador e instalar con las opciones por defecto

- Configuración básica (Linux y macOS)

```shell
    git config --global user.email "your_email@udc.es"
    git config --global user.name "Your Name"
```

> The following line illustrates how to set Sublime as the Git default editor, but you can use any other editor installed in your OS

```shell
    git config --global core.editor "subl -w"
```

- Instalación de utilidad de autocompletado para Git
    - Seguir las instrucciones indicadas en https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion

## Creación y configuración de claves SSH

- Desde un terminal ejecutar:
> Generar las claves en la ruta por defecto ($HOME/.ssh) y con los nombres 
  por defecto
       
```shell
    ssh-keygen -t rsa -b 4096 -C "your_email@udc.es"
```

- Acceder a [https://git.fic.udc.es/profile/keys](https://git.fic.udc.es/profile/keys)
- En el campo "Key" copiar la clave pública, es decir, el contenido del fichero 
  `$HOME/.ssh/id_rsa.pub`
- En el campo "Title" ponerle un nombre
- Clic en "Add key"

- Comprobar conexión SSH con el servidor de git y añadirlo a la lista de hosts 
  conocidos 
  
> Contestar "yes" a "Are you sure you want to continue connecting (yes/no)?"
    
```shell
    ssh -T git@git.fic.udc.es
```


## Instalación de una herramienta cliente gráfica para Git

- Linux: En el ftp está disponible "SmartGit" pero puede utilizarse cualquier otra (https://git-scm.com/downloads/guis)
    - Descargar `smartgit-linux-18_1_4.tar.gz` de [ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients](ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients) y descomprimirlo en `/opt`
    - Para ejecutar la herramienta utilizar el script `/opt/smartgit/bin/smartgit.sh`

    
- macOS: En el ftp está disponible "SourceTree" pero puede utilizarse cualquier otra ([ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients](ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients))
- Instalación en macOS:
    - Descargar `SourceTree_2.7.6a.zip` de [ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients](ftp://ftp.fic.udc.es/POJOyWS/git-gui-clients).
    - Copiar el fichero `SourceTree.app` a la carpeta `Aplicaciones`.
    