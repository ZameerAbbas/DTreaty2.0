
// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import MapView, { Marker, Circle, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
// import Svg, { Circle as SvgCircle, Rect, Polygon as SvgPolygon, Path } from 'react-native-svg';

// const FramAreaCal = () => {
//   const [drawMode, setDrawMode] = React.useState(null); // State to manage drawing mode

//   const handleDrawMode = (mode) => {
//     setDrawMode(mode === drawMode ? null : mode); // Toggle draw mode
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: 36.3167,
//           longitude: 74.65,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }}
//       >
//         {/* Example markers */}
//         <Marker coordinate={{ latitude: 36.3167, longitude: 74.65 }} title="Marker" />

//         {/* Example circle */}
//         <Circle
//           center={{ latitude: 36.3167, longitude: 74.65 }}
//           radius={1000}
//           fillColor="rgba(255, 0, 0, 0.5)"
//         />

//         {/* Example polygon */}
//         <Polygon
//           coordinates={[
//             { latitude: 36.3, longitude: 74.7 },
//             { latitude: 36.4, longitude: 74.8 },
//             { latitude: 36.35, longitude: 74.9 },
//           ]}
//           fillColor="rgba(0, 255, 0, 0.5)"
//         />

//         {/* Example polyline */}
//         <Polyline
//           coordinates={[
//             { latitude: 36.35, longitude: 74.7 },
//             { latitude: 36.35, longitude: 74.8 },
//             { latitude: 36.4, longitude: 74.85 },
//           ]}
//           strokeWidth={2}
//           strokeColor="blue"
//         />
//       </MapView>

//       {/* Zoom controls */}
//       <View style={styles.zoomControls}>
//         <TouchableOpacity onPress={() => {}}>
//           <Text style={styles.controlText}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {}}>
//           <Text style={styles.controlText}>-</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Drawing controls */}
//       <View style={styles.drawingControls}>
//         <TouchableOpacity onPress={() => handleDrawMode('polyline')} style={styles.drawButton}>
//           <Svg height="30" width="30">
//             <SvgPolygon points="15,0 30,30 0,30" fill="none" stroke="black" strokeWidth="2" />
//           </Svg>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleDrawMode('polygon')} style={styles.drawButton}>
//           <Svg height="30" width="30">
//             <Rect x="0" y="0" width="30" height="30" stroke="black" strokeWidth="2" fill="none" />
//           </Svg>
//         </TouchableOpacity>
//         {/* Add other draw buttons as needed */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   zoomControls: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//     padding: 5,
//   },
//   controlText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   drawingControls: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//     padding: 5,
//   },
//   drawButton: {
//     marginVertical: 5,
//   },
// });

// export default FramAreaCal;



import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Polygon, Polyline, useMapEvents } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './MapStyles.css'; // Assuming you have custom styles for your map controls

const FramAreaCal = () => {
  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState([36.3167, 74.65]);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 0));
  };

  const handlePanLeft = () => {
    setCenter(([lat, lng]) => [lat, lng - 0.05]);
  };

  const handlePanRight = () => {
    setCenter(([lat, lng]) => [lat, lng + 0.05]);
  };

  // This component handles the creation of drawing layers
  const MapEvents = () => {
    useMapEvents({
      draw: {
        created: (event) => {
          const layer = event.layer;
          if (layer instanceof L.Marker) {
            layer.bindPopup('Marker added!').openPopup();
          } else if (layer instanceof L.Circle) {
            layer.bindPopup('Circle added!').openPopup();
          } else if (layer instanceof L.Polygon) {
            layer.bindPopup('Polygon added!').openPopup();
          } else if (layer instanceof L.Polyline) {
            layer.bindPopup('Polyline added!').openPopup();
          }
        },
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <EditControl
          position="topright"
          draw={{
            rectangle: true,
            polyline: true,
            polygon: true,
            circle: true,
            marker: true,
          }}
        />
        <MapEvents />
      </MapContainer>

      <div className="map-controls">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handlePanLeft}>←</button>
        <button onClick={handlePanRight}>→</button>
      </div>
    </div>
  );
};

export default FramAreaCal;
