import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useReports } from '@/contexts/ReportContext';
import { useTimeFilter } from '@/context/TimeFilterContext';

// Import marker images as modules
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon2x,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  height?: string;
  categoryOnly?: boolean;
  ignoreFilters?: boolean;
}

const MapView = ({ height = "500px", categoryOnly = false, ignoreFilters = false }: MapViewProps) => {
  const { reports: allReports } = useReports();
  const { selectedCategories } = useTimeFilter();
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default map center
  const [zoomLevel, setZoomLevel] = useState(5);
  const mapRef = useRef(null);

  useEffect(() => {
    if (allReports && allReports.length > 0) {
      // Calculate the average latitude and longitude
      let sumLat = 0;
      let sumLng = 0;
      allReports.forEach(report => {
        sumLat += report.latitude;
        sumLng += report.longitude;
      });
      const avgLat = sumLat / allReports.length;
      const avgLng = sumLng / allReports.length;

      setMapCenter([avgLat, avgLng]);
      setZoomLevel(10);
    }
  }, [allReports]);

  // Obtener reportes filtrados basados en las categorías seleccionadas
  const getFilteredReports = () => {
    if (ignoreFilters) {
      return allReports;
    }
    
    if (categoryOnly && selectedCategories.length > 0) {
      return allReports.filter(report => 
        selectedCategories.includes(report.category)
      );
    }
    
    return allReports;
  };

  const ExportMapData = () => {
    useMapEvents({
      load: () => {
        console.log('map loaded');
      },
      export: () => {
        const map = mapRef.current;
        if (!map) {
          console.error('Map reference is not available.');
          return;
        }
    
        let geojsonData = {
          type: "FeatureCollection",
          features: []
        };
    
        filteredReports.forEach(report => {
          const feature = {
            type: "Feature",
            properties: {
              title: report.title,
              description: report.description,
              category: report.category,
              status: report.status,
              date: report.date,
              // Include other relevant properties
            },
            geometry: {
              type: "Point",
              coordinates: [report.longitude, report.latitude]
            }
          };
          geojsonData.features.push(feature);
        });
    
        const geojsonDataString = JSON.stringify(geojsonData, null, 2);
        const blob = new Blob([geojsonDataString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'map_data.geojson';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
    
    return null;
  };

  // Usar los reportes filtrados para el mapa
  const filteredReports = getFilteredReports();

  return (
    <div className="relative" style={{ height: height || "500px" }}>
      <MapContainer 
        center={mapCenter} 
        zoom={zoomLevel} 
        style={{ height: height || "500px", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredReports.map(report => (
          <Marker 
            key={report.id} 
            position={[report.latitude, report.longitude]}
          >
            <Popup>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <p>Category: {report.category}</p>
            </Popup>
          </Marker>
        ))}
        <ExportMapData />
      </MapContainer>
    </div>
  );
};

export default MapView;
