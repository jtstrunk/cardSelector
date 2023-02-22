import sqlite3
#conn = sqlite3.connect('cards.db')
#c = conn.cursor()
from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)


conn = sqlite3.connect('cards.db')
c = conn.cursor()

c.execute("SELECT * FROM duration")
print(c.fetchall())
c.execute("SELECT * FROM terminalDraw")
print(c.fetchall())
c.execute("SELECT * FROM sifter")
print(c.fetchall())
conn.commit()


def dbconnection():
    conn = sqlite3.connect('cards.db')
    return conn

@app.route('/cards')
def index():
    conn = dbconnection()
    c = conn.cursor()

    c.execute("""SELECT DISTINCT cards.name
            FROM cards, attack
            INNER JOIN action on action.name = cards.name
            WHERE attack.name = cards.name;
            """)
    cards = c.fetchall()
    flatCards = []
    for card in cards:
        flatCards.append(card[0])
    
    response = jsonify(flatCards)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/type')
def inde():
    conn = dbconnection()
    c = conn.cursor()

    cardType = request.args["cardType"]

    c.execute(f"""SELECT DISTINCT cards.name
            FROM cards, {cardType}
            WHERE {cardType}.name = cards.name;
            """)
    cards = c.fetchall()
    flatCards = []
    for card in cards:
        flatCards.append(card[0])
    
    response = jsonify(flatCards)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    # c.execute("""SELECT cards.name
    #         FROM cards, attack
    #         INNER JOIN duration on duration.name = cards.name
    #         WHERE attack.name = cards.name;
    #         """)
    # data = c.fetchall()
    # return data

#c.execute("SELECT * FROM cards")
#print(c.fetchall())

# c.execute("""SELECT cards.name
#             FROM cards, attack
#             INNER JOIN duration on duration.name = cards.name
#             WHERE attack.name = cards.name;
#             """)
# print(c.fetchall())


# conn.commit()

# c.execute("""SELECT cards.name
#             FROM cards
#             INNER JOIN cardscategories on cardscategories.name = cards.name
#             WHERE cardscategories.category='Cantrip'
#             and cards.gameset='Dominion SE';
#             """)

# print(c.fetchall())

# c.execute("""SELECT cards.name
#             FROM cards
#             INNER JOIN cardstype on cardstype.name = cards.name
#             WHERE cardstype.type='Victory'
#             and cards.gameset='Dominion SE';
#             """)

# print(c.fetchall())


#c.execute("SELECT name FROM sqlite_master WHERE type='table';")
#print(c.fetchall())
#conn.close()