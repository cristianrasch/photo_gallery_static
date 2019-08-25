# `photo_gallery_static`

## Installation Instructions

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

## Required Directory Layout

    * Pictures
      * Edinburgh
        * web
        * thumb
      * Glasgow
        * ...

## Usage Instructions

```bash
./build # use dev settings (see config.ini)
CONFIG=PRODUCTION ./build # use production settings
```
