from bs4 import BeautifulSoup
import json

with open("genres.html", "r", encoding="utf-8") as f:
	soup = BeautifulSoup(f, "html.parser")

begin=soup.find("ul", class_="page_genre_index_hierarchy")

def findChildren(element):
	ulList=element.find_all("ul", recursive=False, class_="hierarchy_list")
	childrenList=list()
	if ulList==[]:
		return []
	else:
		for ul in ulList:
			div=ul.find("div")
			li=ul.find("li")
			name=div.find("a").text
			try:
				link="https://rateyourmusic.com"+div.find("a").get("href")
			except Exception as e:
				print(ul)
				raise e
			description=div.find("p").text
			children=findChildren(li)
			childrenList.append({"nodeName":name, "description":description, "link":link, "type":"type3", "children":children})
		return childrenList

arbre={"tree":[{"nodeName":"RYM", "type":"type1", "link":"", "description":"", "children":[]}]}
genresList=arbre["tree"][0]["children"]

for genre in begin.contents[1:-1:2]:
	childrenList=list()
	begin2=genre.find("div", class_="page_genre_index_hierarchy_item_expanded")
	childrenList=findChildren(begin2)
	genresList.append({"nodeName":genre.find("h2").text, "type":"type2", "description":genre.find("p").text, "link":"https://rateyourmusic.com/"+genre.find("a").get("href"), "children":childrenList})

with open("result.json","w",encoding="utf-8") as f:
	json.dump(arbre, f)