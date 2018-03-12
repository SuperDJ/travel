<template>
    <div class="google-maps" :id="mapName"></div>
</template>

<script>
    export default
    {
    	name: 'googleMaps',

    	props: {
    		name: {
    			type: String,
                required: false,
                default: '',
            },
            zoom: {
    			type: Number,
                default: 8
            },
            center: {
    			type: Object,
            },
            markers: {
    			type: Array,
            }
        },

        data()
        {
    	    return {
    	        mapName: `${this.name}-map`,
                map: null,
                bounds: null,
                boundsCoords: [],
            }
        },

		mounted() {
			this.bounds = new google.maps.LatLngBounds();

			const element = document.getElementById( this.mapName );

            const options = {
                zoom: this.zoom,
                center: new google.maps.LatLng( this.center ? this.center : this.markers[0] )
            };

			this.map = new google.maps.Map( element, options );

			if( this.markers.length > 1 )
			{
				for( let i = 0; i < this.markers.length; i++ )
				{
					const position = new google.maps.LatLng( this.markers[0].lat, this.markers[0].lng );
					const marker = new google.maps.Marker( { position, map: this.map } );

					this.boundsCoords.push(marker => {
						this.map.fitBounds(this.bounds.extend(position));
                    });
                }
            }
		}
    }
</script>

<style scoped>
    .google-maps {
        width: 100%;
        height: 500px;
    }
</style>