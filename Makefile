# maxdepth limit the recursive search depth in your folder
SASSFILES = $(shell find ./ -maxdepth 50 -type f -name '*.sass')
SCSSFILES = $(shell find ./ -maxdepth 50 -type f -name '*.scss')
SCSSES = $(SCSSFILES:.scss=.css) $(SASSFILES:.sass=.css)
# the compiler command installed on your operating system. can be sass, node-sass etc
COMPILER = sass

all: $(SCSSES)

%.css: %.scss
	#compile scss'
	$(COMPILER)  $< > $@

%.css: %.sass
	#compile sass'
	$(COMPILER)  $< > $@
