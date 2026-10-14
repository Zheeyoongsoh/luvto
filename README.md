# Luvto Gelato 网站使用说明

这是一个纯静态网站（HTML + CSS + JavaScript），不需要数据库、不需要后端，买任何普通虚拟主机（cPanel / Hostinger / Exabytes / Namecheap 等）都可以直接用。

## 一、文件夹里有什么

| 文件 / 文件夹 | 用途 |
|---|---|
| `index.html` | 网页本体（首页入口，必须放在网站根目录） |
| `styles.css` | **所有样式（颜色、字体、间距、动画）都在这里，可以自己编辑** |
| `app.js` | 网站程序（订购链接、卡片、动画触发），一般不用改 |
| `data/config.js` | **WhatsApp 号码、Instagram、TikTok、邮箱、营业时间** |
| `data/flavours.js` | **口味菜单（名字、价格、图片、是否有货）** |
| `data/events.js` | **市集 / Pop-up 活动公告** |
| `assets/` | Logo、图标、分享图、怪物和小推车的透明图（`assets/sprites/`） |

用普通文字编辑器（记事本、VS Code、TextEdit 纯文字模式）编辑即可。保留引号 `" "` 和逗号 `,`。

## 二、上传到主机（买了 hosting 之后）

1. 先解压 zip，确认里面有 `index.html`、`styles.css`、`app.js`、`data`、`assets`。
2. 登录主机后台，打开 **File Manager**（文件管理器），进入 `public_html` 文件夹（有些主机叫 `www` 或 `htdocs`）。
3. 把解压后的**所有内容**上传进去。`index.html` 要直接在 `public_html` 里，不要多包一层文件夹。
4. 打开你的域名，网站就上线了。以后改了文件，重新上传覆盖即可。
5. 把域名绑定好后，打开 `index.html`，找到两处 `assets/og-image.png`，改成完整网址，例如 `https://www.你的域名.com/assets/og-image.png`。这样在 WhatsApp / Facebook 分享链接时才会显示 Luvto 的预览图。

重要：不要把单个 `index.html` 拿出来单独打开或单独上传。它需要和 `styles.css`、`assets`、`data` 放在一起，否则会出现没有样式的情况。

## 三、日常修改

### 换 WhatsApp 号码
打开 `data/config.js`，把 `YOUR_WHATSAPP_NUMBER` 换成你的号码：
`whatsappNumber: "60123456789"`
格式是国家区号加号码，不要空格、加号和横线（+60 12-345 6789 写成 `60123456789`）。所有订购按钮都会自动更新。没改之前，点订购按钮只会弹出"号码未设置"的提示。

### 改口味和价格
打开 `data/flavours.js`，每个 `{ ... }` 是一张卡片。
- 修改：直接改里面的文字。`price: 8.5` 会显示 RM 8.50；`price: ""` 显示 "Price TBC"。
- 新增：复制整个 `{ ... },` 粘贴到最后一个下面。
- 删除：删掉整个 `{ ... },`。
- `status` 可选 `"available"`、`"sold-out"`、`"coming-soon"`。
- 现在的 5 个口味只是**示例**。换成真实菜单后，把 `config.js` 里的 `menuIsConfirmed` 改成 `true`，页面上的"示例菜单"提示就会消失。
- 成分、过敏原、Halal 等信息，只有确认属实才写。

### 换产品图片
1. 新建 `assets/flavours` 文件夹，放入照片（JPG 或 WebP，宽约 800px，每张小于 150KB）。
2. 在 `flavours.js` 里写 `image: "assets/flavours/pistachio.jpg"`，并填一句 `imageAlt` 描述图片。

### 更新活动
打开 `data/events.js`，复制里面被注释的例子，删掉每行开头的 `//`，填入名字、地点、日期、时间，`mapLink` 放 Google Maps 或 Waze 的分享链接。活动结束后删掉那一块。

### 社交账号、邮箱、营业时间
都在 `data/config.js`，填完整链接即可；留空 `""` 的会显示"Coming soon"或自动隐藏。

### 改颜色、字体、动画
打开 `styles.css`，最上面的 `:root { ... }` 是颜色和字体设置（例如 `--red`、`--blue`、`--pink`）。每个怪物场景的动画在文件下半部分的 `MONSTER WORLD` 区块，按场景名分开（`s-run`、`s-flop`、`s-oh`、`s-peek`、`s-sleep`、`s-dance`）。

## 四、费用

| 项目 | 费用 |
|---|---|
| 虚拟主机 | 视你购买的方案而定（这个网站很小，最便宜的方案就够用） |
| 域名（.com） | 约每年 RM 45–80，价格因注册商而异 |
| 数据库 / 后端 / 支付网关 | 不使用，RM 0 |

网站的字体来自 Google Fonts（免费）。字体加载不了时，会自动换成相近的系统字体。

## 五、关于 logo 和怪物

`assets/logo-original.png` 是你的原始 logo，没有被修改。页面上的怪物、小推车、花朵是从 logo 里抠出来的透明图（只去掉背景，颜色和线条没有改），动画是用代码做的位移、旋转和压扁，没有重新画怪物。"趴着吃"和"融化大哭"是用动画来表现的，因为原图里没有这些姿势；如果以后你们的设计师画了新姿势（趴着、哭脸、掉冰淇淋），可以把图放进 `assets/sprites/`，我可以帮你换进去。

点击订购按钮只会打开 WhatsApp 并带上一条草稿消息，不代表订单已确认，需要你回复客人。
