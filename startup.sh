#bash generate_reports.sh

#environment
if [ ! $1 ]; then
        echo "Example of use: bash startup.sh dev"
        exit 1
fi
env=$1

if [ $env != "local" ]; then
	echo "";
else
	echo "starting up local environment"
  source config/local_env.sh
  echo $METEOR_SETTINGS
  echo $MONGO_URL
  meteor --settings config/settings.json
fi;

if [ $env != "prod" ]; then
	echo "";
else
	echo "prod";
  source config/prod_env.sh
  echo $METEOR_SETTINGS
  echo $MONGO_URL
  meteor --settings config/settings-production.json
fi;

if [ $env != "dev" ]; then
	echo "";
else
	echo "dev";
  source config/dev_env.sh
  echo $METEOR_SETTINGS
  echo $MONGO_URL
  meteor --settings config/settings-development.json
fi;
