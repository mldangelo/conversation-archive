import glob
import pandas as pd

matches = sorted(glob.glob('./data/matches-*.json'), reverse=True)[0] # most recent index
print(matches)

messages = sorted(glob.glob('./data/messages/*-*.json'))
print(len(messages))
unique_messages = { m.split('-')[0]: m for m in messages } # most recent unique dump
print(len(unique_messages))

print(pd.read_json(messages[0]))

# for m in unique_messages:
#    read_json
