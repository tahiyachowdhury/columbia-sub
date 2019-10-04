from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json, operator
application = Flask(__name__)

current_id = 31
rentals = [
    {
        "id": 1, 
        "address": "123 86th street and Lexington Ave",
        "rooms": 1,
        "rent": 1100,
        "contact": "tc2672@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/372990927.jpg",
    },
    {
        "id": 2, 
        "address": "456 W. 116th St & Amstardam Ave",
        "rooms": 1,
        "rent": 1200,
        "contact": "ana@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/373623068.jpg",
    },
    {
        "id": 3, 
        "address": "56 W. 50th street",
        "rooms": 1,
        "rent": 1000,
        "contact": "cd345@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/373711405.jpg",
    },
    {
        "id": 4, 
        "address": "789 W. 125th St & Broadway",
        "rooms": 1,
        "rent": 900,
        "contact": "sara@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/375641684.jpg",
    },
    {
        "id": 5, 
        "address": "101 Greenwitch St.",
        "rooms": 2,
        "rent": 1800,
        "contact": "faijac@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376129783.jpg",
    },
    {
        "id": 6, 
        "address": "132 W. 114th St & Broadway",
        "rooms": 1,
        "rent": 1200,
        "contact": "tony@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/376196234.jpg",
    },
    {
        "id": 7, 
        "address": "456 W. 114th St & Amstardam Ave",
        "rooms": 1,
        "rent": 1300,
        "contact": "aj3478@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/376418293.jpg",
    },
    {
        "id": 8, 
        "address": "567 W. 115th St & Manhattan Ave",
        "rooms": 2,
        "rent": 1200,
        "contact": "tahiyachowdhury@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/376581027.jpg",
    },
    {
        "id": 9, 
        "address": "784 Sunnyside Ave",
        "rooms": 1,
        "rent": 1300,
        "contact": "elizabeth@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376691515.jpg",
    },
    {
        "id": 10, 
        "address": "786 W. 105th St & Broadway",
        "rooms": 1,
        "rent": 1000,
        "contact": "nj6745@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376993127.jpg",
    },
    {
        "id": 11, 
        "address": "834 W. 100th St & Broadway",
        "rooms": 1,
        "rent": 1200,
        "contact": "tc2672@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377055381.jpg",
    },
    {
        "id": 12, 
        "address": "98 W. 116th St & Columbus Ave",
        "rooms": 2,
        "rent": 1050,
        "contact": "hg6785@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377063579.jpg",
    },
    {
        "id": 13, 
        "address": "345 W. 104th St & Amstardam Ave",
        "rooms": 1,
        "rent": 750,
        "contact": "henryj@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377075717.jpg",
    },
    {
        "id": 14, 
        "address": "234 W. 113th St & Broadway",
        "rooms": 1,
        "rent": 950,
        "contact": "hji3456@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377076799.jpg"
    },
    {
        "id": 15, 
        "address": "330 W. 96th St & Amstardam Ave",
        "rooms": 1,
        "rent": 900,
        "contact": "gary@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377085114.jpg"
    },
    {
        "id": 16, 
        "address": "847 W. 111th St & Broadway",
        "rooms": 1,
        "rent": 800,
        "contact": "julia@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377089259.jpg"
    },
    {
        "id": 17, 
        "address": "789 W. 116th St & Broadway",
        "rooms": 1,
        "rent": 1200,
        "contact": "ted@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377125682.jpg"
    },
    {
        "id": 18,  
        "address": "45 W. 118th St & Amstardam Ave",
        "rooms": 1,
        "rent": 1100,
        "contact": "jonathan@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377132606.jpg"
    },
    {
        "id": 19, 
        "address": "75 W. 119th St & Broadway",
        "rooms": 1,
        "rent": 1150,
        "contact": "hi5672@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377138619.jpg"
    },
    {
        "id": 20, 
        "address": "319 W. 101st St & Broadway",
        "rooms": 1,
        "rent": 1200,
        "contact": "ty4682@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377139482.jpg"
    },
    {
        "id": 21, 
        "address": "424  W. 102nd St & Amstardam Ave",
        "rooms": 1,
        "rent": 750,
        "contact": "george@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377141282.jpg"
    },
    {
        "id": 22, 
        "address": "564 W. 111th St & Manhattan Ave",
        "rooms": 1,
        "rent": 1000,
        "contact": "eliza@housing.com",
        "gender": "Female",
        "image": "/static/pics/377168251.jpg"
    },
    {
        "id": 23, 
        "address": "138 W. 126th St & Columbus Ave",
        "rooms": 1,
        "rent": 950,
        "contact": "ds3456@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/3771715542.jpg"
    },
    {
        "id": 24, 
        "address": "13 W. 102nd St & Broadway",
        "rooms": 1,
        "rent": 900,
        "contact": "smith@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376418293.jpg"
    },
    {
        "id": 25, 
        "address": "134 W. 115th St & Broadway",
        "rooms": 1,
        "rent": 800,
        "contact": "shannon@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/376955031.jpg"
    },
    {
        "id": 26, 
        "address": "555 W. 117th St & Manhattan Ave",
        "rooms": 1,
        "rent": 1000,
        "contact": "tara@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376960216.jpg"
    },
    {
        "id": 27, 
        "address": "353 W. 116th St & Manhattan Ave",
        "rooms": 1,
        "rent": 950,
        "contact": "tc2672@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376966113.jpg"
    },
    {
        "id": 28, 
        "address": "254 W. 103rd St & Amstardam Ave",
        "rooms": 1,
        "rent": 850,
        "contact": "tc2672@columbia.edu",
        "gender": "Male",
        "image": "/static/pics/377033812.jpg"
    },
    {
        "id": 29, 
        "address": "542 W. 118th St & Amstardam Ave",
        "rooms": 1,
        "rent": 750,
        "contact": "aaron@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/376926787.jpg"
    },
    {
        "id": 30, 
        "address": "241 77th street and 3rd Ave",
        "rooms": 1,
        "rent": 600,
        "contact": "taylor@columbia.edu",
        "gender": "Female",
        "image": "/static/pics/377162737.jpg"
    },
]

@application.route('/')
def index():
   return render_template('index.html')

@application.route('/find_apt')
def find_rent():
   return render_template('find_rent.html', rentals = rentals)

@application.route('/list_apt')
def list_rent():
   return render_template('list_rent.html', rentals = rentals)

@application.route('/save_rental', methods=['GET', 'POST'])
def save_rental():
    global rentals
    global current_id   

    #UPDATES SALES
    rental_data = request.get_json()    
    rental_data["id"] = current_id
    current_id += 1
    #prepend the new sale to the sales data.
    #sales = [sale_data] + sales
    rentals.append(rental_data)


    return jsonify(rentals = rentals)


@application.route('/delete_rental', methods=['GET', 'POST'])
def delete_rental():
    global rentals

    id_json = request.get_json()
    
    delete_id = int(id_json["id"])

    index_to_delete = None
    for (i, r) in enumerate(rentals):
        r_id = r["id"]
        if r_id == delete_id:
            index_to_delete = i

            break

    if index_to_delete is not None:
        del rentals[index_to_delete]


    return jsonify(rentals = rentals)


@application.route('/search_rental', methods=['GET', 'POST'])
def search_rental():
    global rentals
    search_res = []
    room_res = []
    rent_res = []
    gender_res = []

    search = request.get_json()    
    search_text = search[0]
    search_room = int(search[1])
    search_gender = search[3] 

    if(str(search[2]) != 'Any'):
        search_price = search[2].split('-')
        search_price_low = int(search_price[0])
        search_price_high = int(search_price[1])
    else:
        search_price_low = 0
        search_price_high = float("inf")
    
    if(search_text):
        for data in rentals:
            for val in data.values():
                if(search_text.lower() in str(val).lower()):
                    search_res.append(data)

        for data in search_res:
            if(data["rooms"] == search_room):
                room_res.append(data)

        room_res.sort(key=operator.itemgetter('rent'))
        
        for data in room_res:
            if(data["rent"] >= search_price_low and data["rent"] <= search_price_high):
                rent_res.append(data)

        for data in rent_res:
            if(data["gender"] == search_gender):
                gender_res.append(data) 

    else:
        for data in rentals:
            if(data["rooms"] == search_room):
                room_res.append(data)

        room_res.sort(key=operator.itemgetter('rent'))
        
        for data in room_res:
            if(data["rent"] >= search_price_low and data["rent"] <= search_price_high):
                rent_res.append(data)

        for data in rent_res:
            if(data["gender"] == search_gender):
                gender_res.append(data) 


    return jsonify(search_res = gender_res)


if __name__ == '__main__':
   #app.run(host='0.0.0.0')
   application.config['TEMPLATES_AUTO_RELOAD'] = True
   application.run()
