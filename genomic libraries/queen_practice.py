from QUEEN.queen import QUEEN
from QUEEN.qfunction import cutdna
from QUEEN import cutsite


template1= QUEEN(record="C:/Users/Wel/Downloads/addgene-plasmid-39296-sequence-364511.gbk")
template2= QUEEN(record="C:/Users/Wel/Desktop/snapgene/test/test1.gb")
primers= QUEEN(record="C:/Users/Wel/Desktop/snapgene/test/Primers from pcrGFP1.fa")



sites= template1.searchsequence(cutsite.lib["AatII"])
fragments= cutdna(template1, *sites)
print(type(template1))
print(type(fragments[0]))

fragments[0]._product_id = 'blah'

sites1= fragments[0].searchsequence(cutsite.lib["EcoO109I"])
print(sites1[0].qualifiers)

fragments1= cutdna(fragments[0], *sites1)
print(len(fragments))