<h1 align="center">Status Checker</h1>
<p align="center">
A Discord Bot retrieves your user presence from the web server, which can be useful on a website or any other application. (Supports WebSocket)
<br><br>
<img src="https://i.imgur.com/57qdhpb.gif" style="width: 80%"></img>
</p>

<h1 align="center">Usage</h1>

- ### Installation
  - Install **`pnpm`**:
    
    ```shell
    > npm i -g pnpm
    ```
  - Clone repo from git.
    
    ```shell
    > git clone https://github.com/Zv-yz/StatusChecker
    ```  
  - Create your **`.env`** file using **`.env.example`**.
    
    ```
    PORT=80
    WS_PORT=443
    GUILD_ID=XXXXXXXXXXXXXXXXXX
    USER_ID=XXXXXXXXXXXXXXXXXXX
    ```  
  - Install the dependencies:
    
    ```shell
    > pnpm i
    ```

- ### Starting
   ```shell
   > node . 
   ```