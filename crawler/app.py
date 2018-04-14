import requests as rq


def elasticsearch(id):
    url = 'http://localhost:9200/customer/external/%d?pretty&pretty'%(id)

    res = rq.put(url, data='{"name": "John Doe"}')

    print(res.json())


if __name__ == '__main__':
  elasticsearch(4)
