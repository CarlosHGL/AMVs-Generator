from collections import deque
# import datetime
# import json
# import math
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

# grafo_sem_pesos = {
#     'A': ['B', 'C'],
#     'B': ['A', 'C', 'D'],
#     'C': ['A', 'B', 'D', 'E'],
#     'D': ['B', 'C', 'E', 'F'],
#     'E': ['C', 'D', 'F'],
#     'F': ['D', 'E']
# }

grafo_sem_pesos = {
    "BRADO-L1": ["AMV-BRADO-L1"],
    "BRADO-L2": ["AMV-BRADO-L2"],
    "CIAS": ["AMV-CIAS"],
    "RUMO": ["AMV-RUMO"],
    "TECIAP": ["AMV-TECIAP"],
    "AMV-BRADO-L1": ["BRADO-L1", "AMV-BRADO-L2"],
    "AMV-BRADO-L2": ["AMV-BRADO-L1", "BRADO-L2", "AMV-BRADO-CIAS"],
    "AMV-BRADO-CIAS": ["AMV-BRADO-L2", "AMV-CIAS", "AMV-BRADO"],
    "AMV-CIAS": ["CIAS", "AMV-RUMO", "AMV-BRADO-CIAS"],
    "AMV-RUMO": ["AMV-CIAS", "AMV-FORM-T-p-RUMO", "RUMO"],
    "AMV-FORM-T-p-RUMO": ["AMV-RUMO", "AMV-TECIAP", "AMV-FORM-R-p-LIQUIDOS"],
    "AMV-TECIAP": ["AMV-FORM-T-p-RUMO", "AMV-LIQUIDOS", "TECIAP"],
    "AMV-LIQUIDOS": ["AMV-TECIAP", "AMV-FORM-R-p-LIQUIDOS", "AMV-FINAL-LIQUIDOS"],
    "AMV-FORM-R-p-LIQUIDOS": ["AMV-LIQUIDOS", "AMV-FORMAÇÃO", "AMV-FORM-T-p-RUMO"],
    "AMV-FORMAÇÃO": ["AMV-FORM-R-p-LIQUIDOS", "AMV-BRADO", "AMV-FINAL-FORMAÇÃO"],
    "AMV-BRADO": ["AMV-FINAL-BRADO", "AMV-FORMAÇÃO", "AMV-BRADO-CIAS"],
    "AMV-FINAL-BRADO": ["AMV-BRADO", "AMV-FINAL-FORMAÇÃO"],
    "AMV-FINAL-FORMAÇÃO": ["AMV-FORMAÇÃO", "AMV-FINAL-BRADO", "AMV-FINAL-LIQUIDOS"],
    "AMV-FINAL-LIQUIDOS": ["AMV-LIQUIDOS", "AMV-FINAL-FORMAÇÃO"]
}

amvList = [
    "AMV-RUMO", "AMV-CIAS", "AMV-TECIAP", "AMV-LIQUIDOS", "AMV-FORMAÇÃO",
    "AMV-BRADO", "AMV-BRADO-L1", "AMV-BRADO-L2", "AMV-BRADO-CIAS",
    "AMV-FINAL-BRADO", "AMV-FINAL-FORMAÇÃO", "AMV-FINAL-LIQUIDOS",
    "AMV-FORM-T-p-RUMO", "AMV-FORM-R-p-LIQUIDOS", "BRADO-L1", "BRADO-L2",
    "TECIAP", "RUMO", "CIAS"
]

amvNumber = {
    "BRADO-L1":1, 
    "BRADO-L2":2,
    "TECIAP":4, 
    "RUMO":7, 
    "CIAS":11,
    "AMV-RUMO":16, 
    "AMV-CIAS":22, 
    "AMV-TECIAP":29, 
    "AMV-LIQUIDOS":37, 
    "AMV-FORMAÇÃO":46,
    "AMV-BRADO":56, 
    "AMV-BRADO-L1":67, 
    "AMV-BRADO-L2":79, 
    "AMV-BRADO-CIAS":92,
    "AMV-FINAL-BRADO":106, 
    "AMV-FINAL-FORMAÇÃO":121, 
    "AMV-FINAL-LIQUIDOS":137,
    "AMV-FORM-T-p-RUMO":154, 
    "AMV-FORM-R-p-LIQUIDOS":172 
}

def bfs_todas_rotas(grafo, inicio, fim):
  if inicio == fim:
    return [[inicio]]

  fila = deque()
  fila.append([inicio])
  rotas_encontradas = []

  while fila:
    caminho = fila.popleft()
    vertice_atual = caminho[-1]

    for vizinho in grafo[vertice_atual]:
      if vizinho not in caminho:
        novo_caminho = list(caminho)
        novo_caminho.append(vizinho)

        if vizinho == fim:
          rotas_encontradas.append(novo_caminho)
        else:
          fila.append(novo_caminho)

  return rotas_encontradas


# Exemplo de uso para encontrar todas as rotas possíveis e listar os AMVs visitados
inicio_sem_pesos = 'BRADO-L1'
fim_sem_pesos = 'AMV-FINAL-LIQUIDOS'
rotas_possiveis_sem_pesos = bfs_todas_rotas(grafo_sem_pesos, inicio_sem_pesos,
                                            fim_sem_pesos)

# if rotas_possiveis_sem_pesos:
#   print(f"Todas as rotas possíveis de {inicio_sem_pesos} para {fim_sem_pesos}:")
#   for i, rota in enumerate(rotas_possiveis_sem_pesos, 1):
#       print(f"Rota {i}: {rota}")
#   # print(f"Lista de AMVs visitados: {lista_amvs_visitados}")
# else:
#   print(f"Não há rotas possíveis de {inicio_sem_pesos} para {fim_sem_pesos}")

app = Flask('app')
CORS(app)


@app.route("/api/user/v2/generate-routes", methods=['GET', 'POST'])
def generateRoutesGraf():
  if request.method == 'GET':
    return jsonify({'mensagem': 'Requisição GET recebida com sucesso!'})

  elif request.method == 'POST':
    data = request.get_json()
    rotas = bfs_todas_rotas(grafo_sem_pesos, data["startPoint"], data["endPoint"])

    return jsonify({
        'mensagem': 'Requisição POST recebida com sucesso!',
        'dados': rotas
    })

  return {}


@app.route("/api/user/points/list", methods=['GET'])
def pointsList():
  return {}


@app.route("/api/user/generate/routes", methods=['GET', 'POST'])
def generateRoutes():
  return {}


@app.route("/login", methods=['GET', 'POST'])
def login():
  return render_template("index.html")


@app.route("/user/checklist", methods=['GET', 'POST'])
def ferramenta():
  return render_template("route_generator.html")


@app.route("/user/drawGraf", methods=['GET', 'POST'])
def grafo():
  return render_template("graw_Graf_Page.html")

if __name__ == "__main__":
    app.run()
