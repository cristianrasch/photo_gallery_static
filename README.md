# `photo_gallery_static`

## Installation Instructions

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

## Required Directory Layout

1. Traditional folder names:

    * Pictures
      * Edinburgh
        * web
        * thumb
      * Glasgow
        * ...

2. Folder names that follow the Month_YEAR naming convention

        * Pictures
          * August_2019
            * web
            * thumb
          * July_2019
            * ...

Turn on the following setting in config.ini to have your months folders grouped
by year

```
# config.ini
group_months_by_year=1
```

## Usage Instructions

```bash
./build # use dev settings (see config.ini)
CONFIG=PRODUCTION ./build # use production settings
```
