BIN = ./node_modules/.bin
BEM = $(BIN)/bem
MOCHA = $(BIN)/mocha
JSHINT = $(BIN)/jshint

.PHONY: all
all:

.PHONY: clean
clean:

.PHONY: jshint
jshint:
	$(JSHINT) lib test

.PHONY: test
test: jshint
	$(MOCHA)

