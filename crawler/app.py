from hfc.fabric.client import Client
cli = Client(net_profile="./network.json")

print(cli.organizations)
