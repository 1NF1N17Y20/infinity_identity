RegisterNetEvent("identity:save")
AddEventHandler(
	"identity:save",
	function(data, license, isnew)
		if isnew then
			insertNewIdentityToDatabase(data, license)
		else
			updateIdentityToDatabase(data, license)
		end
	end
)

function insertNewIdentityToDatabase(data, license)
	MySQL.Async.execute('INSERT INTO users SET identifier = @identifier, firstname = @firstname, lastname = @lastname, dateofbirth = @dateofbirth, weight = @weight, sex = @sex, height = @height', {
		['@identifier']  = license,
		['@firstname'] = data.firstname,
		['@lastname'] = data.lastname,
		['@dateofbirth'] = data.dob,
		['@sex'] = data.sex,
		['@height'] = data.height,
		['@weight'] = data.weight
	})
end

function updateIdentityToDatabase(data, license)
	MySQL.Async.execute('UPDATE users SET firstname = @firstname, lastname = @lastname, dateofbirth = @dateofbirth, weight = @weight, sex = @sex, height = @height WHERE identifier = @identifier', {
		['@identifier']  = license,
		['@firstname'] = data.firstname,
		['@lastname'] = data.lastname,
		['@dateofbirth'] = data.dob,
		['@sex'] = data.sex,
		['@height'] = data.height,
		['@weight'] = data.weight
	})
end