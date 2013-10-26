TOPDIR = .
include $(TOPDIR)/config

SRC = *.cpp 

BIN = a.exe

bin : $(BIN) 

clean :
	-rm -f a.exe

$(BIN) : clean
	$(CXX) -g $(SRC) -o $@ -I$(LUADIR) -L$(LUADIR) -l$(LUALIB)
	# $(CXX) -g $(SRC) -o $@ -I$(LUADIR) $(LUADIR)/$(LUALIBFILE)

