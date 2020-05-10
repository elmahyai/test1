hasLocationPermission = async () => {
    
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }
  
getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    console.log(hasLocationPermission)
    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
            const json_data = JSON.stringify(position, null, 4)
            obj = JSON.parse(json_data)
            console.log(obj.coords)
          const {latitude, longitude} = obj.coords
          this.setState({ latitude: latitude, longitude:longitude });
          this.props.GET_LATITUDE_action(latitude)
          this.props.GET_LONGITUDE_action(longitude)

        },
        (error) => {
          //this.setState({ location: error });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
      );
    });
  }
