# MySQL Script (Ubuntu)

A lightweight MySQL administration helper for Ubuntu/Linux that makes
common database tasks fast, safe, and intuitive from the terminal.

---

## ✨ Features

-   Install MySQL with guided commands
-   Show commonly used MySQL systemctl operations
-   List only user‑created databases (filters system databases)
-   List only user‑created accounts (filters system users)
-   Create / drop databases safely
-   Create / drop users
-   Grant or revoke database access for users
-   Inspect permissions:
    -   Databases accessible by a user
    -   Users with access to a database
-   Open MySQL server configuration file quickly

---

## 📦 Requirements

-   Linux (tested on Ubuntu)
-   MySQL Server installed
-   Bash shell
-   Node.js (via nvm recommended)
-   Sudo privileges

---

## 🚀 Usage

``` bash
./run.sh <command> [argument]
```

---

## 🧾 Commands

### Help & System

| Command       | Description                               |
|---------------|-------------------------------------------|
| `help`        | Show help message                         |
| `help:install`| Show MySQL installation steps             |
| `help:system` | Show commonly used systemctl commands     |

---

### User Management

| Command        | Description                                 |
|----------------|---------------------------------------------|
| `user:show`    | List created MySQL users                    |
| `user:create`  | Create a new user                           |
| `user:drop`    | Drop an existing user                       |
| `user:db:show` | List databases accessible by a user         |

#### Create User Spec Format

    user:<name>,host:<host>,password:<password>

Example:

``` bash
./run.sh user:create user:admin,host:192.168.0.100,password:StrongPass123
```

---

### Database Management

| Command       | Description                                  |
|---------------|----------------------------------------------|
| `db:show`     | List created databases                       |
| `db:create`   | Create a database                            |
| `db:drop`     | Drop a database                              |
| `db:user:show`| List users with access to a database         |

#### Create Database Spec

    name:<database_name>

Example:

``` bash
./run.sh db:create name:test
```

---

### Permissions Management

| Command     | Description                                 |
|-------------|---------------------------------------------|
| `db:grant`  | Grant database access to a user             |
| `db:revoke` | Revoke database access from a user          |

#### Grant/Revoke Spec Format

    user:<name>,host:<host>,db:<database>

Example:

``` bash
./run.sh db:grant user:admin,host:192.168.0.100,db:test
```

---

### Configuration

| Command | Description                                |
|---------|--------------------------------------------|
| `config`| Open MySQL server config in nano editor    |

Default file:

    /etc/mysql/mysql.conf.d/mysqld.cnf

---

## 📄 License

MIT --- use freely for personal or commercial projects.

---

## 👤 Author

Alex Chen
