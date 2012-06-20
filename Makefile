.DEFAULT_GOAL = run
REPORTER = spec
TESTS = test/*.js
TEST_COVERAGE = test/coverage.html

test:
	@TEST=1 ./node_modules/.bin/mocha --reporter $(REPORTER) $(TESTS)

test-cov: lib-cov
	@COV=1 $(MAKE) -s test REPORTER=html-cov > $(TEST_COVERAGE) && chromium-browser $(TEST_COVERAGE)

lib-cov:
	@jscoverage --no-highlight lib lib-cov

run:
	node app.js

lint:
	jshint app.js lib/

lint-test:
	jshint test/

deploy:
	jitsu deploy -r patch

clean:
	rm -f -r $(TEST_COVERAGE) lib-cov

.PHONY: test run clean lint lint-test deploy
