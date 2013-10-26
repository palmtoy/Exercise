TOPDIR = .
include $(TOPDIR)/config

SRC = studying.cpp 

BIN = a

bin : $(BIN) 

clean :
	-rm -f $(BIN)

$(BIN) : clean
	$(CXX) -g $(SRC) -o $@
