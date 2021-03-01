local display = false
local pdata = {}
local isnew = false

RegisterNUICallback(
	"exit",
	function(data)
		SetDisplay(false)
	end
)

RegisterNetEvent("identity:start")
AddEventHandler(
	"identity:start",
	function(ppdata)
		print("Starting Identity Menu")
		pdata = ppdata
		isnew = ppdata.new
		SetDisplay(not display)
	end
)

RegisterNUICallback(
	"main",
	function(data)
		SetDisplay(false)
		TriggerServerEvent("identity:save", data, pdata.license, isnew)
		if pdata.new then
			print("The player is new. Sending to char edit.")
			TriggerEvent("cui_character:recievePlayerData", pdata)
		end
		print("Finished Identity Menu")
	end
)

RegisterNUICallback(
	"error",
	function(data)
		print(data.error)
		SetDisplay(false)
		Citizen.Wait(500)
		SetDisplay(true)
	end
)

function SetDisplay(bool)
	display = bool
	SetNuiFocus(bool, bool)
	SendNUIMessage(
		{
			type = "ui",
			status = bool,
			new = isnew
		}
	)
end

Citizen.CreateThread(
	function()
		while display do
			Citizen.Wait(0)
			DisableControlAction(0, 1, display) -- LookLeftRight
			DisableControlAction(0, 2, display) -- LookUpDown
			DisableControlAction(0, 142, display) -- MeleeAttackAlternate
			DisableControlAction(0, 18, display) -- Enter
			DisableControlAction(0, 322, display) -- ESC
			DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
		end
	end
)
