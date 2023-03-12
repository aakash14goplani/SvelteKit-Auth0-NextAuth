<footer>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-invalid-attribute -->
	<nav>
		<ul>
			<li><a href="#">Privacy Policy</a></li>
			<li><a href="#">Terms of Use</a></li>
      <li style="float:right"><a href="#">© 2023, Aakash Goplani</a></li>
		</ul>
	</nav>
</footer>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #3dcd58;
		
		li {
			float: left;

			a {
				display: block;
				color: white;
				text-align: center;
				padding: 14px 16px;
				text-decoration: none;
				cursor: pointer;
			}

			a:hover:not(.active) {
				background-color: darkgreen;
			}
		}
	}
</style>