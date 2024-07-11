# Mobile

## runing the app
naviaget to app directory:  C:...findmyprofessors\mobile\app

in terminal run:  
- flutter clean
- flutter pub get
- flutter pub run flutter_native_splash:create
- flutter run

## setting up app to use local host
- in powershell
- navigate to playfoprm tools directory (ex: cd C:\Android\platform-tools)
- run: .\adb reverse tcp:8080 tcp:8080
