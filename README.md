# 聊天式记录器

一个像即时聊天一样的记录工具，可以把记录的数据存储至浏览器或者同步至数据库（登录的用户）。

## 功能

* 记录即时发生的事件（已完成）
* 登录的用户可以同步记录至数据库（已完成）
* 生成事件的时间轴（尚未开始）

## 配置及启动

### 后端

#### MongoDB 数据库配置

1. 首先，确保有本地 MongoDB 服务，连接地址及端口为 `mongodb://localhost:27017`；
2. 创建 `chat-logger` 数据库，并添加两个集合 `messages` 和 `users`；
3. 导入 `MongoDbJSON` 目录下的两个JSON文件进数据库对应的集合。

#### 后端服务启动

在目录 `\chat-logger-backend` 下，运行
``` bash
mvn clean package
```

紧接着，也是在该目录下运行
``` bash
java -jar target/logger-0.0.1-SNAPSHOT.jar
```

**注意**：运行上述两个命令时，须提前使用下方两个命令来确保 Maven 使用的 Java 版本及 Java 版本为 17。
``` bash
mvn -version
java -version
```

### 前端

#### 依赖安装

在 `frontend` 目录下，运行如下命令来安装所需依赖
``` java
npm install
```

#### 前端启动

在 `frontend` 目录下，运行如下命令来启动前端
``` bash
npm run start
```

## 技术栈

| 功能 | 技术 |
| - | - |
| 后端 | Spring Boot 3.3.0 + Java 17 |
| 前端 | React.js 18.3.1 |
| Token 生成 | Jwt  |
| 数据库 | MongoDB |
| 缓存 | Redis |

# Chat Logger

A log tool like chat. It can put records into your browser or syncronize with the database (if logged in). 

## Funcitonalities

* Log events happened in real time (done)
* Syncronized with the database for logged in users (function is done but without completed authentication)
* Generate timeline for events (to be done)

## Configuration and Running

### Backend

#### MongoDB Database Configuration

1. Firstly, ensure there is a MongoDB service at local: `mongodb://localhost:27017`；
2. Create `chat-logger` database, and two collections: `messages` and `users`；
3. Import two JSON file into collections from the directory `MongoDbJSON` .

#### Running the backend service

Run the below command line at the directory `\chat-logger-backend`
``` bash
mvn clean package
```

Next, run the below command at the same directory
``` bash
java -jar target/logger-0.0.1-SNAPSHOT.jar
```

**Note**：Before running above commands, you had better confirm that your Java of Maven and Java version are both Java 17.
``` bash
mvn -version
java -version
```

### Frontend

#### Dependencies

Run below command at the directory `frontend` to install packages
``` java
npm install
```

#### Running the frontend

Run the below command at the directory `frontend` to run the frontend
``` bash
npm run start
```

## Technology Stack

| Function | Tech |
| - | - |
| Backend | Spring Boot 3.3.0 + Java 17 |
| Frontend | React.js 18.3.1 |
| Token generation | Jwt  |
| Database | MongoDB |
| Cache | Redis |
