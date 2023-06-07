<script>
	import '../app.css';
</script>

<div class="flex flex-wrap justify-between mx-4 my-4">
	<a href="/">Home</a>
	<a href="/dashboard">Dashboard</a>
	<a href="/projects">Projects</a>
	<a href="/issues">Issues</a>
	<a href="/users">Users</a>
	<a href="/time_clocks">Time Clocks</a>
</div>

<div class="p-4">
	<slot />
</div>
