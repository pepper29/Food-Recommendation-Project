import unittest
import json
import requests

class UnitTest(unittest.TestCase):
    def setUp(self):
        self.host = 'http://localhost:5000'

    def test_get_movies_GET(self):
        response = requests.get(self.host+'/movie')
        data = response.json()

        # 정상적으로 통신 확인
        self.assertEqual(200, response.status_code)
        # 인기순위 작품 n개(10개)가 모두 반환되었는지 확인
        self.assertEqual(10, len(data.keys()))

    def test_get_movies_POST(self):
        input_data = {
            "selectedTags": {0: "우울한", 1: "신나는"},
            "searchOption": "ganada"
        }
        response = requests.post(self.host+'/movie', data= json.dumps(input_data))
        data = response.json()

        # 정상적으로 통신 확인
        self.assertEqual(200, response.status_code)
        

    
if __name__ == '__main__':
    unittest.main()