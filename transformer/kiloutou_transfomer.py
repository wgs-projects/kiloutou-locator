# coding=utf-8
import unicodecsv as csv
import json
import os
import time
import requests
from datetime import datetime


YOUR_INPUT_CSV_FILE = 'kiloutou_agency.csv'
WOOSMAP_PRIVATE_API_KEY = '5086eabb-8b82-467c-844c-f407ab6b3bef'
BATCH_SIZE = 50
TAG_FIELDS = ['hearing_loop', 'self_serve_facility', 'image_clearing', 'disabled_access', 'atm', 'deposit_atm',
              'audio_atm', 'cash_handling', 'free_wifi', 'store_ipdas', 'tea_and_coffee', 'mobile_charging']
TYPE_FIELDS = ['branch_type_retail']


class MyCSVDialect(csv.Dialect):
    delimiter = ','
    quotechar = '"'
    doublequote = True
    skipinitialspace = False
    lineterminator = '\n'
    quoting = csv.QUOTE_ALL


class Woosmap:
    """A wrapper around the Woosmap Data API."""

    WOOSMAP_API_HOSTNAME = 'api.woosmap.com'

    def __init__(self):
        self.session = requests.Session()

    def delete(self):
        self.session.delete('https://{hostname}/stores/'.format(hostname=self.WOOSMAP_API_HOSTNAME),
                            params={'private_key': WOOSMAP_PRIVATE_API_KEY})

    def post(self, payload):
        return self.session.post('https://{hostname}/stores/'.format(hostname=self.WOOSMAP_API_HOSTNAME),
                                 params={'private_key': WOOSMAP_PRIVATE_API_KEY},
                                 json={'stores': payload})

    def end(self):
        self.session.close()


def get_name(asset):
    name = asset.get('name', '')
    if name:
        return name
    else:
        raise ValueError('Unable to get the Name')


def get_id(asset):
    asset_id = asset.get('storeId', '')
    return asset_id


# def get_tags(asset):
# tags = []
# for field in TAG_FIELDS:
# if asset.get(field, 'N') == 'Y':
# tags.append(field)
# return tags


def get_types(asset):
    type = asset.get('ShopType', '')
    if type:
        formatted_type = type.replace(" ", "-").replace("é", "e").replace("(", "").replace(")", "").lower()
        return [formatted_type]
    else:
        raise ValueError('Unable to get the types')


def get_contact(asset):
    return {
        'website': asset.get('Website', ''),
        'phone': asset.get('phone', ''),
        # 'phone aftersales': asset.get('telephone_aftersales', ''),
        'email': asset.get('email', '')
    }


# def get_userProperties(asset):
# return {
# 'user_prop1_bank': asset.get('user_prop1_bank', ''),
# 'user_prop2_show': asset.get('user_prop2_show', ''),
# 'user_prop3_type': asset.get('user_prop3_type', ''),
# 'user_prop4_image': asset.get('user_prop4_image', ''),
# 'user_prop5_osgrid': asset.get('user_prop5_osgrid', ''),
# 'user_prop6_easting': asset.get('user_prop6_easting', ''),
# 'user_prop7_northing': asset.get('user_prop7_northing', ''),
# 'user_prop8_fax': asset.get('user_prop8_fax', ''),
# 'user_prop9_pov_heading': asset.get('user_prop9_pov_heading', '')
# }


def get_geometry(asset):
    latitude = asset.get('lat', None)
    longitude = asset.get('lng', None)
    if latitude is not None and longitude is not None:
        return {
            'lat': float(latitude),
            'lng': float(longitude)
        }
    else:
        raise ValueError('Unable to get the location')


def get_address(asset):
    return {
        'lines': [asset.get('address_1', '')],
        'city': asset.get('city', ''),
        # 'state': asset.get('state', ''),
        'zipcode': asset.get('zipcode', '')
    }


def convert24(str1):
    hours = datetime.strptime(str1, '%I:%M%p')
    return hours.strftime("%H:%M")


# This method below gave incorrect hours so i hashed it out and now use the method above
# def convert24(str1):
#   if "am" in str1:
#      return str1.replace('am', '')
# else:
#    hours_pm = str(int(str1.replace('pm', '').split(':')[0]) + 12) + ":" + str1.replace('pm', '').split(':')[1]
#   return hours_pm.replace('24', '00')


# below includes new script to handle lunchtime closing hours
def get_regular_hours(asset):
    usual = {}
    week_days = [{'1': 'opening_1_hour'},
                 {'2': 'opening_2_hour'},
                 {'3': 'opening_3_hour'},
                 {'4': 'opening_4_hour'},
                 {'5': 'opening_5_hour'},
                 {'6': 'opening_6_hour'},
                 {'7': 'opening_7_hour'}]

    hours_field = ''
    for day in week_days:
        for key in day:
            hours_field = asset.get(day[key], "")
            if "&" in hours_field:
                usual.setdefault(key, []).append(
                    {'start': hours_field.split("&")[0].split("-")[0].strip().replace('.', ':'),
                     'end': hours_field.split("&")[0].split("-")[1].strip().replace('.', ':')})
                usual.setdefault(key, []).append(
                    {'start': hours_field.split("&")[1].split("-")[0].strip().replace('.', ':'),
                     'end': hours_field.split("&")[1].split("-")[1].strip().replace('.', ':')})
            elif len(hours_field) > 2:
                usual.setdefault(key, []).append(
                    {'start': hours_field.split("-")[0].strip().replace('.', ':'),
                     'end': hours_field.split("-")[1].strip().replace('.', ':')})
            print(usual)
    return usual


def get_hours(asset):
    print('hours')
    return {'timezone': 'Europe/Paris',
            'usual': get_regular_hours(asset)}


def convert_to_woosmap(asset):
    converted_asset = {}
    try:
        converted_asset.update({
            'storeId': get_id(asset),
            'name': get_name(asset),
            'address': get_address(asset),
            'contact': get_contact(asset),
            'location': get_geometry(asset),
            # 'tags': get_tags(asset),
            'types': get_types(asset),
            'openingHours': get_hours(asset),
            # 'userProperties': get_userProperties(asset)
        })
    except ValueError as ve:
        print('ValueError Raised {0} for Asset {1}'.format(ve, json.dumps(asset, indent=2)))

    return converted_asset


def import_assets(assets_data, woosmap_api_helper):
    try:
        print('Batch import {count} Assets...'.format(count=len(assets_data)))
        response = woosmap_api_helper.post(assets_data)
        if response.status_code >= 400:
            response.raise_for_status()

    except requests.exceptions.HTTPError as http_exception:
        if http_exception.response.status_code >= 400:
            print('Woosmap API Import Error: {0}'.format(http_exception.response.text))
        else:
            print('Error requesting the API: {0}'.format(http_exception))
        return False
    except Exception as exception:
        print('Failed importing Assets! {0}'.format(exception))
        return False

    print('Successfully imported in {0} seconds'.format(response.elapsed.total_seconds()))
    return True


def batch(assets_data, n=1):
    l = len(assets_data)
    for ndx in range(0, l, n):
        yield assets_data[ndx:min(ndx + n, l)]


def main():
    start = time.time()
    print('Start parsing and importing your data...')
    with open(file_path, 'rb') as csv_file:
        try:
            reader = csv.DictReader(csv_file, dialect=MyCSVDialect())
            woosmap_assets = []
            for asset in reader:
                print(asset)
                converted_asset = convert_to_woosmap(asset)
                if bool(converted_asset):
                    woosmap_assets.append(converted_asset)

            print('{0} Assets converted from source file'.format(len(woosmap_assets)))

            woosmap_api_helper = Woosmap()
            # /!\ deleting existing assets before posting new ones /!\
            woosmap_api_helper.delete()

            count_imported_assets = 0
            for chunk in batch(woosmap_assets, BATCH_SIZE):
                imported_success = import_assets(chunk, woosmap_api_helper)
                if imported_success:
                    count_imported_assets += len(chunk)

            woosmap_api_helper.end()
            print("{0} Assets successfully imported".format(count_imported_assets))

        except csv.Error as csv_error:
            print('Error in CSV file found: {0}'.format(csv_error))
        except Exception as exception:
            print("Script Failed! {0}".format(exception))
        finally:
            end = time.time()
            print('...Script ended in {0} seconds'.format(end - start))


if __name__ == '__main__':
    file_path = os.path.join(os.getcwd(), YOUR_INPUT_CSV_FILE)
    if os.path.exists(file_path):
        main()
    else:
        print('File not found: {0} '.format(file_path))
